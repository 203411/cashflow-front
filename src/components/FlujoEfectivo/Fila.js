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
            {/* <td>{id}</td> */}
            <td style={{width: "14vh"}}>{fecha}</td>
            <td style={{width: "11vh"}}>{tipo}</td>
            <td style={{width: "30vh"}}>{descripcion}</td>
            <td style={{width: "16vh"}}>${cantidad}</td>
            <td style={{width: "20vh", textAlign : "center"}}>{categoria.descripcion}</td>
            <td style={{width: "28vh"}}>{categoria.sub_categoria}</td>
        </tr>
    )
}

export default Fila;