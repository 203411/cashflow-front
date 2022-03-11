import { Component } from 'react';
import axios from 'axios';
import StyleLogin from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons'

export default class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            username : "",
            password : "",
            iconPass : false
        }
    }

    consumir_login = () =>{
        var postData={
            username: this.state.username,
            password : this.state.password
        }        

        if(this.state.username === "" && this.state.password === ""){
            alert("Debes rellenar todos los campos")
        }else if(this.state.username === ""){
            alert("Campo Nombre de usuario no puede ser vacío")
        }else if(this.state.password === ""){
            alert("Campo Contraseña no puede ser vacío")
        }else{
            axios
                .post("http://localhost:8000/cash_flow/login/user", postData, {
                    Headers: { 
                    'Content-Type': 'application/json',}
                })
                .then((response) => {
                    console.log(response.data);
                    localStorage.setItem('userIdLocal', response.data.user_id);
                    localStorage.setItem('tokenLocal', response.data.token);
                    alert("Inicio de sesión exitoso");
                })
                .catch((error) => {
                    console.log(error.response.data);
                    if(error.response.data.non_field_errors !== null){
                        alert("Datos incorrectos");
                    }
                })
        }
    }

    setUsername = (e) =>{
        this.setState({
            username : e.target.value
        })
    }

    setPassword = (e) =>{
        this.setState({
            password : e.target.value
        })
    }

    verContraseña = () =>{
        if(document.getElementById("pass").type === "password"){
            document.getElementById("pass").type = "text"
            this.setState({iconPass : true})
        }else{
            document.getElementById("pass").type = "password"
            this.setState({iconPass : false})
        }
    }

    render(){
        return(
            <div className={StyleLogin.body}>
                <div className={StyleLogin.background}>
                    <div className={StyleLogin.containerBackground}>
                        <p className={StyleLogin.title} id={StyleLogin.title}>CashFlow</p>
                        <p className={StyleLogin.subtitle} id={StyleLogin.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse.</p>
                    </div>
                    <div className={StyleLogin.circleBorder} id={StyleLogin.circleTop}></div>
                    <div className={StyleLogin.circleBorder} id={StyleLogin.circleBottom}></div>
                </div>
                <div className={StyleLogin.container}>
                    <div className={StyleLogin.formText}>
                        <p className={StyleLogin.title}>Hola de nuevo</p>
                        <p className={StyleLogin.subtitle}>Bienvenido de vuelta</p>
                    </div>
                    <div className={StyleLogin.formContainer}>
                        <div className={StyleLogin.group}>
                            <input onChange={this.setUsername} placeholder='Nombre de usuario' id="user"/>
                            <FontAwesomeIcon icon={faUser} className={StyleLogin.icon} id={StyleLogin.userIcon}/>
                        </div>
                        <div className={StyleLogin.group}>
                            <input onChange={this.setPassword} placeholder='Contraseña' type="password" id="pass"/>
                            <FontAwesomeIcon icon={this.state.iconPass === true ? faUnlock : faLock} className={StyleLogin.icon} onClick={this.verContraseña} id={StyleLogin.passIcon}/>
                        </div>
                        <button id={StyleLogin.subtitle} onClick={this.consumir_login}>Iniciar sesión</button>
                    </div>
                </div>
            </div>
        );
    }
}