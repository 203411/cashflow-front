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
            {this.state.isManager}
        </div>
        );
    }
}