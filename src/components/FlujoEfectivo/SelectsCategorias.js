import React from "react";

const SelectsCategorias = ({el}) =>{
    let {id, descripcion, sub_categoria} = el;
    return (
        <option value={id}>{id} - {descripcion} - {sub_categoria} </option>
    )
}

export default SelectsCategorias;