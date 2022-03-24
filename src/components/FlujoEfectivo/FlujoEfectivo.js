import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import CategoriaCss from '../Categorias/Categorias.module.css';
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
    // const [listCategorias, setListCategorias] = useState([]);
    const [listC, setListC] = useState([]);

    const token = localStorage.getItem('tokenLocal');


    const [categoriaEntrada, setCategoriaEntrada] = useState([]);
    const [categoriaSalida, setCategoriaSalida] = useState([]);

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

    const getCategoriasSalida = () =>{ //trae categorias COSTO-VENTA y GASTOS-AOC
        axios.get("http://localhost:8000/cash_flow/categorias/salida",{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            setCategoriaSalida(response.data);
        })
    }

    useEffect(()=>{
        get_flujos();
        getCategoriasEntrada();
        getCategoriasSalida();
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
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            console.log(response.data)
            alert("Guardado")
            get_flujos();
        }).catch((error)=>{
            console.log(error.response.data)
            alert("No se pudo agregar")
        })
    }

    return (
        <div className="d-md-flex justify-content-center " style={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(60,49,79,1) 16%, rgba(0,212,255,1) 62%)' }}>
            <Form className='mt-1 pb-3' style={{ background: 'white', padding: '1%', borderRadius: '10px'}}>
                <Form.Group className="mb-4 mt-2" controlId="formBasicPassword">
                    <div style={{ textAlign: 'center', fontSize: 'x-large' }}>Flujo Efectivo</div>
                </Form.Group>
                <Form.Group className="mb-2 p-2 row" controlId="formBasicPassword" style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
                    <div className='col-sm-5'>
                        <label>Tipo:</label>
                        <div className="input-group mb-0">
                            <select className="custom-select" onChange={(e)=>{setTipo(e.target.value === "" ? null : e.target.value); {e.target.value === "Entrada" ? setListC(categoriaEntrada) : (e.target.value === "Salida" ? setListC(categoriaSalida) : setListC([]))}}}>
                                <option value={""}>Selecciona tipo movimiento</option>
                                <option value={"Entrada"}>Entrada</option>
                                <option value={"Salida"}>Salida</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-sm-5'>
                        <label>Categoria:</label>
                        <div className="input-group mb-0">
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
                        </div>
                    </div>
                </Form.Group>
                <Form.Group controlId="formBasicPassword" style={{display:"flex", justifyContent: "center", alignItems: "center",width : "100%"}}>
                    <div style={{width : "82%"}}>
                        <label>Descripcion:</label>
                        <div className="input-group" aria-label="Descripcion del flujo de efectivo a agregar">
                            <textarea className="form-control" onChange={(e)=> setDescripcion(e.target.value)} aria-label="With textarea" placeholder="Descripcion acerca del flujo "></textarea>
                        </div>
                    </div>
                </Form.Group>
                <Form.Group className="mb-2 mt-2 row" controlId="formBasicPassword" style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
                    <div className='col-sm-5'>
                        <label>Cantidad:</label>
                        <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input type="number" className="form-control" onChange={(e)=> setCantidad(e.target.value)} placeholder="Cantidad " aria-label="Amount (to the nearest dollar)" min={"1"} max={"9999999.99"} step={"0.01"}/>
                        </div>
                    </div>
                    <div style={{ textAlign: 'Center' }} className='col-sm-5'>
                        <Button onClick={()=> agregar_flujos()} style={{ borderRadius: '100px', boxShadow: 'none', paddingLeft: '10%', paddingRight: '10%' }} size="lg">Registrar</Button>
                    </div>
                </Form.Group>
                <Form.Group className="mb-0" controlId="formBasicPassword">
                    <Table striped bordered hover variant="dark" className={CategoriaCss.tableFixed}>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th style={{width: "14vh", textAlign : "center"}}>Fecha</th>
                                <th style={{width: "11vh", textAlign : "center"}}>Tipo</th>
                                <th style={{width: "30vh", textAlign : "center"}}>Descripcion</th>
                                <th style={{width: "16vh", textAlign : "center"}}>Cantidad</th>
                                <th style={{width: "20vh", textAlign : "center"}}>Categoria</th>
                                <th style={{width: "30vh", textAlign : "center"}}>Sub-Categoria</th>
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
            <div className={CategoriaCss.divButton}>
                <Link to="/home">
                    <button className={CategoriaCss.buttonHome}>Home</button>
                </Link>
            </div>
        </div>
    );

}

