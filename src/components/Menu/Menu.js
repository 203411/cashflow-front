import { Component } from "react";

export default class Menu extends Component{
    constructor(props){
        super(props);

        this.state = {
            isManager : localStorage.getItem("isManager")
        }
    }

    render(){
        return(
        <div>
            {this.state.isManager==="true" ? <Manager/> : <Worker/>}
        </div>
        );
    }
}

class Manager extends Component{
    render(){
        return(
            <div>
                <h1>Manager interface</h1>
            </div>
        );
    }
}

class Worker extends Component{
    render(){
        return(
            <div>
                <h1>Worker interface</h1>
            </div>
        );
    }
}