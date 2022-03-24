import React, {  useEffect, useState } from 'react'
import axios from 'axios';
import {  Table, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CategoriaCss from '../Categorias/Categorias.module.css'

export default function Indicadores() {

    let token = localStorage.getItem('tokenLocal');

    const [num_semana, setNumSemana] = useState('');
    const [razon_social, setRazonSocial] = useState('');
    const [monto, setMonto] = useState('');
    const [tipo, setTipo] = useState('');

    const optionIndicador = ["Cuentas por pagar", "Cuentas por cobrar", "Banco"];

    const [listIndicadores, setListIndicadores] = useState([]);

    const get_indicadores = () => {
        axios.get("http://localhost:8000/cash_flow/indicadores/dinero", {
            headers: {
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
            setListIndicadores(response.data);
        }).catch((error) => {
            alert("No se obtuvieron los registros");
        })
    }


    useEffect(() => {
        get_indicadores();
        get_fecha();
    }, []);

    const get_fecha = () =>{
        let semana;
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        const dia = hoy.toDateString().substring(8,10)
        if (dia<8) {
            semana = 1
        }else if(dia>7 && dia<15){
            semana = 2
        }else if(dia>14 && dia<22){
            semana = 3
        }else if(dia>21 && dia<28){
            semana = 4
        }else if(dia>27){
            semana = 5
        }
        document.getElementById("semana").value = semana
    }
    const agregar_indicadores = () => {
        const data = {
            num_semana : num_semana,
            razon_social: razon_social,
            monto : monto,
            tipo : tipo
        }

        axios.post("http://localhost:8000/cash_flow/indicadores/dinero", data, {
            headers: {
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
            get_indicadores()
        }).catch((error) => {
            if(error.response.data != null){
                console.log(error.response.data.num_semana);
            }
            alert("No se pudo agregar")
        })
    }

    return (
        <div className="d-md-flex justify-content-center " style={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(60,49,79,1) 16%, rgba(0,212,255,1) 62%)' }}>
            <Form className='mt-4, pb-4 ' style={{ background: 'white', padding: '1%', borderRadius: '10px' }}>
                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                    <div style={{ textAlign: 'center', fontSize: 'x-large' }}>Indicadores de dinero</div>
                </Form.Group>
                <Form.Group className="mb-4 mt-4 row" controlId="formBasicPassword">
                    <div className='col-sm-6'>
                        <label>Numero de semana:</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"></span>
                            </div>
                            <input type="number" className="form-control" onChange={(e) => setNumSemana(e.target.value)} placeholder="Numero de semana " max={5} min={1} aria-label="Amount (to the nearest dollar)" id="semana" disabled/>
                        </div>
                    </div>
                    <div className='col-sm-5'>
                        <label>Tipo de Indicador:</label>
                        <select class="custom-select" onChange={(e) => setTipo(e.target.value === 'Seleccione una opcion' ? null : e.target.value)} id="tipo">
                            <option selected>Seleccione una opcion</option>
                            {optionIndicador.length > 0 ?
                                (optionIndicador.map((value) =>
                                    <option value={value}>{value}</option>
                                )) : (
                                    <option value={"0"}>No hay opciones registradas</option>
                                )
                            }
                        </select>
                    </div>
                </Form.Group>
                <Form.Group className="mb-2 mt-2" controlId="formBasicPassword">
                    <label>Razon Social:</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" onChange={(e) => setRazonSocial(e.target.value)} placeholder="Razon social o descripcion del movimiento " aria-label="Amount (to the nearest dollar)" id="razon_social" />
                    </div>
                </Form.Group>
                <Form.Group className="mb-2 mt-2" controlId="formBasicPassword" style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
                    <div className='col-sm-5'>
                        <label>Monto:</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">$</span>
                            </div>
                            <input type="number" className="form-control" onChange={(e) => setMonto(e.target.value)} placeholder="Monto " aria-label="Amount (to the nearest dollar)" />
                        </div>
                    </div>
                    <div className='col-sm-5' style={{ textAlign: 'Center' }}>
                        <Button onClick={() => agregar_indicadores()} style={{ borderRadius: '100px', boxShadow: 'none', paddingLeft: '10%', paddingRight: '10%' }} size="lg">Registrar</Button>
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Table striped bordered hover variant="dark" className={CategoriaCss.tableFixed}>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th style={{width: "14vh", textAlign : "center"}}>Fecha</th>
                                <th style={{width: "14vh", textAlign : "center"}}>#Semana</th>
                                <th style={{width: "30vh", textAlign : "center"}}>Tipo</th>
                                <th style={{width: "35vh", textAlign : "center"}}>Descripcion</th>
                                <th style={{width: "16vh", textAlign : "center"}}>Monto</th>

                            </tr>
                        </thead>
                        <tbody>
                            {listIndicadores.length > 0 ?
                                (listIndicadores.map((value) => (
                                    <tr key={value.id}>
                                        {/* <td>{value.id}</td> */}
                                        <td style={{width: "14vh", textAlign : "center"}}>{value.fecha}</td> 
                                        <td style={{width: "14vh", textAlign : "center"}}>{value.num_semana}</td>
                                        <td style={{width: "30vh", textAlign : "center"}}>{value.tipo}</td>
                                        <td style={{width: "35vh", textAlign : "center"}}>{value.razon_social}</td>
                                        <td style={{width: "14vh", textAlign : "center"}}>{value.monto}</td>
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
            <div style={{ position: "absolute", left: "0" }}>
                <Link to="/home"><button style={{ padding: "15px 40px", fontSize: "16px", borderRadius: "30px", border: "none", background: "#dadada", cursor: "pointer", margin: "0 20px 0 20px" }}>
                    Home
                </button></Link>
            </div>
        </div>
    );

}

