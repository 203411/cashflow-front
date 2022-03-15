import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Form, Table, Button} from 'react-bootstrap';

export default function Categorias() {
    const token = localStorage.getItem('tokenLocal');

    const [clasificacion, setClasificacion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [subCategoria, setSubCategoria] = useState('');

    const [listCategorias, setListCategorias] = useState([])

    useEffect(()=>{
        get_categorias()
    },[]);
    
    const get_categorias = () => {
        axios
            .get("http://localhost:8000/cash_flow/categorias/options", {
                headers: {
                    'Authorization': 'Token ' + token,
                }
            }).then((response) => {
                console.log(response.data)
                setListCategorias(response.data)
                console.log(listCategorias)
            }).catch((error) => {
                console.log(error.data)
            })
        }

    const optionClasificacion = ['Seleccione una clasificación','Costo-Venta' , 'Egreso']

    const agregar_categoria =  () => {

        if(clasificacion === null && categoria === "" && subCategoria === ""){
            alert("Debes rellenar todos los campos")
        }else if (clasificacion === null){
            alert("El campo clasificacion no puede estar vacio")
        }else if(categoria === ""){
            alert("El campo categoria no puede estar vacio")
        }else if(subCategoria === ""){
            alert("El campo sub-categoria no puede estar vacio")
        }else{
            var postData = {
                clasificacion : clasificacion, 
                descripcion : categoria, 
                sub_categoria : subCategoria, 
            }

            axios
                .post("http://localhost:8000/cash_flow/categorias/options",postData,{
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Token ' + token,
                }
                }).then((response) => {
                    get_categorias()
                    document.getElementById("clasificacion").value = optionClasificacion[0];
                    document.getElementById("categoria").value = "";
                    document.getElementById("sub_categoria").value = "";
                }).catch((error) => {
                    console.log(error.data)
                })
        }
        console.log(postData);
        }

    return (
        <div className="d-md-flex justify-content-center " style={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(60,49,79,1) 16%, rgba(0,212,255,1) 62%)' }}>
            <Form className='mt-4, pb-4 ' style={{ background: 'white', padding: '1%', borderRadius: '10px' }}>
                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                    <div style={{ textAlign: 'center', fontSize: 'x-large' }}>Gestion de Categorias</div>
                </Form.Group>
                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                    <label>Clasificacion:</label>
                    <select class="custom-select" onChange={(e)=> setClasificacion(e.target.value === "Seleccione una clasificación" ? null : e.target.value)} id="clasificacion">
                        {optionClasificacion.length > 0 ?
                            (optionClasificacion.map((value)=>
                                <option value={value}>{value}</option>
                            )):(
                                <option value={"0"}>No hay clasificaciones registradas</option>
                            )
                        }
                    </select>
                </Form.Group>
                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                    <label>Categoria:</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" onChange={(e)=> setCategoria(e.target.value)} placeholder="Categoria " aria-label="Amount (to the nearest dollar)" id="categoria"/>
                    </div>
                </Form.Group>
                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                    <label>Sub-Categoria:</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" onChange={(e)=> setSubCategoria(e.target.value)} placeholder="Sub-Categoria " aria-label="Amount (to the nearest dollar)" id="sub_categoria"/>
                    </div>
                </Form.Group>
                <div style={{ textAlign: 'Center' }} className='mb-3'>
                    <Button onClick={()=> agregar_categoria()} style={{borderRadius: '100px', boxShadow: 'none', paddingLeft: '10%', paddingRight: '10%' }} size="md" block>Guardar</Button>
                </div>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Table striped bordered hover variant="dark" style={{}}>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th>Clasificacion</th>
                                <th>Categoria</th>
                                <th>Sub-Categoria</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listCategorias.length > 0 ?
                                (listCategorias.map((value) => (
                                    <tr>
                                        {/* <td>{value.id}</td> */}
                                        <td>{value.clasificacion}</td>
                                        <td>{value.descripcion}</td> {/*muestra la categoria*/}
                                        <td>{value.sub_categoria}</td>
                                        <td>
                                            <button  className="btn btn-primary btn-sm" onClick={console.log()} ><FontAwesomeIcon icon={faEdit}/></button>{"   "}
                                        </td>
                                    </tr>
                                ))
                                ) : (
                                    <tr>
                                        <td>
                                            Sin datos
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Form.Group>
            </Form>
        </div>
    );
}