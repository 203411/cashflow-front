import { Component } from "react";
import MenuCss from "./Menu.module.css"
import StyleLogin from "../UsuarioLogin/Login.module.css"
import { Link, Outlet } from "react-router-dom";
export default class Menu extends Component{

    
    constructor(props){
        super(props);
        
        this.state = {
            isManager : localStorage.getItem("isManager")
        }
    }
    
    render(){
        return(
            <div className={MenuCss.body}>
            {/* <Outlet/> */}
            <div className={MenuCss.container}>
                {this.state.isManager==="true" ? <Manager/> : (this.state.isManager==="false" ? <Worker/> : <div><h1>Sin acceso</h1></div>)}
            </div>
            <Link className={MenuCss.link} to="/">Log out</Link>
            <div className={StyleLogin.circleBorder} id={StyleLogin.circleBottom} style={{ left: '85%'}}></div>
            <div className={StyleLogin.circleBorder} id={StyleLogin.circleTop}></div>
        </div>
        );
    }
}

class Manager extends Component{
    render(){
        return(
            <div>
                <div className={MenuCss.containerOptions}>
                    <Link to="/categorias"><button>Categorias</button></Link>
                    <Link to="/flujo"><button>Flujo de efectivo</button></Link>
                    <button>Generar reporte</button>
                </div>
                <Link className={MenuCss.link} to="/registro" id={MenuCss.register}>Registro</Link>
            </div>
        );
    }
}

class Worker extends Component{
    render(){
        return(
            <div className={MenuCss.containerOptions}>
                <button>Categorias</button>
                <button>Flujo de efectivo</button>
            </div>
        );
    }
}