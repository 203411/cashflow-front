import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import SelectsCategorias from "./SelectsCategorias";
import Fila from './Fila';
import { Link } from 'react-router-dom';

export default function FlujoEfectivo()  {

    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [tipo, setTipo] = useState('');

    const [listFlujos, setListFlujos] = useState([]);
    const [listCategorias, setListCategorias] = useState([]);
    const [listC, setListC] = useState([]);

    const token = localStorage.getItem('tokenLocal');


    const [categoriaEntrada, setCategoriaEntrada] = useState([]);
    const [categoriaSalida, setCategoriaSalida] = useState([]);
    const [categoriaSalida2, setCategoriaSalida2] = useState([]);

    const get_flujos = () => {
        axios.get("http://localhost:8000/cash_flow/flujo/efectivo",{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            setListFlujos(response.data);

        }).catch((error)=>{
            alert("No se obtuvieron los registros");
        })
    }

    const getCategoriasEntrada = () =>{ //trae categorias de INGRESO
        axios.get("http://localhost:8000/cash_flow/categorias/entrada",{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            setCategoriaEntrada(response.data);
        })
    }

    const get_categorias_salida = () =>{
        axios.get("http://localhost:8000/cash_flow/categorias/costo",{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            setCategoriaSalida(response.data);
        })
    }

    const get_categorias_salida2 =() =>{
        axios.get("http://localhost:8000/cash_flow/categorias/gasto",{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            for( let i=0; i < response.data.length ; i++){
                setCategoriaSalida([...categoriaSalida,response.data[i]]);
            }
        })
    }


    useEffect(()=>{
        get_flujos();
        getCategoriasEntrada();
        get_categorias_salida();
        get_categorias_salida2();
    },[]);

    const agregar_flujos = () =>{
        const data = {
            id_categoria : categoria,
            descripcion : descripcion,
            cantidad : cantidad,
            tipo : tipo
        }
        
        axios.post("http://localhost:8000/cash_flow/flujo/efectivo",data,{
            headers :{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            get_flujos();
        }).catch((error)=>{
            alert("No se pudo agregar")
        })
    }

    return (
        <div className="d-md-flex justify-content-center " style={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(60,49,79,1) 16%, rgba(0,212,255,1) 62%)' }}>
            <Form className='mt-4, pb-4 ' style={{ background: 'white', padding: '1%', borderRadius: '10px' }}>
                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                    <div style={{ textAlign: 'center', fontSize: 'x-large' }}>FlujoEfectivo</div>
                </Form.Group>
                                <Form.Group className="mb-3 p-2" controlId="formBasicPassword">
                    <label>Tipo:</label>
                    <div className="input-group mb-3">
                        <select className="custom-select" onChange={(e)=>{setTipo(e.target.value); {e.target.value === "Entrada" ? setListC(categoriaEntrada) : setListC(categoriaSalida)}}}>
                            <option value={"Entrada"}>Entrada</option>
                            <option value={"Salida"}>Salida</option>
                        </select>
                        
                    </div>
                </Form.Group>
                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                    <label>Categoria:</label>
                    <select className="custom-select" onChange={(e)=> setCategoria(e.target.value)}>
                        {listC.length > 0 ?
                                (listC.map((el)=>(<SelectsCategorias
                                    key = {el.id}
                                    el = {el}
                                />))
                                ):(
                                    <option value={"0"}>No hay categorias registradas</option>
                                )
                            }
                    </select>
                </Form.Group>
                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                    <label>Descripcion:</label>
                    <div className="input-group" aria-label="Descripcion del flujo de efectivo a agregar">
                        <textarea className="form-control" onChange={(e)=> setDescripcion(e.target.value)} aria-label="With textarea" placeholder="Descripcion acerca del flujo "></textarea>
                    </div>
                </Form.Group>
                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                    <label>Cantidad:</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input type="number" className="form-control" onChange={(e)=> setCantidad(e.target.value)} placeholder="Cantidad " aria-label="Amount (to the nearest dollar)" />
                    </div>
                </Form.Group>

                <div style={{ textAlign: 'Center' }} className='mb-3'>
                    <Button onClick={()=> agregar_flujos()} style={{ borderRadius: '100px', boxShadow: 'none', paddingLeft: '10%', paddingRight: '10%' }} size="md">Registrar</Button>
                </div>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Descripcion</th>
                                <th>Cantidad</th>
                                <th>Categoria</th>
                                <th>Sub-Categoria</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listFlujos.length > 0 ?
                                (listFlujos.map((el)=>(<Fila
                                    key = {el.id}
                                    el = {el}
                                    token = {token}
                                />))
                                ):(
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
            <div style={{position: "absolute", left: "0" }}>
                <Link to="/home"><button style={{padding: "15px 40px", fontSize : "16px",borderRadius: "30px",border: "none",background: "#dadada",cursor: "pointer",margin: "0 20px 0 20px"}}>
                    Home
                </button></Link>
            </div>
        </div>
    );

}

