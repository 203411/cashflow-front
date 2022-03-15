import axios from "axios";
import React, { useEffect, useState } from "react";

const Fila = ({el, token}) =>{

    let {id, fecha, tipo,id_categoria, descripcion, cantidad} = el;

    const [categoria, setCategoria] = useState('');
 
    useEffect(()=>{
        get_categorias();
    },[]);

    const get_categorias = () =>{
        axios.get("http://localhost:8000/cash_flow/categorias/options/"+id_categoria,{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            setCategoria(response.data);
        })
    }
    
    return(
        <tr>
            <td>{id}</td>
            <td>{fecha}</td>
            <td>{tipo}</td>
            <td>{descripcion}</td>
            <td>${cantidad}</td>
            <td>{categoria.descripcion}</td>
            <td>{categoria.sub_categoria}</td>
        </tr>
    )
}

export default Fila;