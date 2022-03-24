import React, { Component, useEffect, useState, useRef} from 'react'
import axios from 'axios';
import { Dropdown, Table, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const ReporteIndicadores = React.forwardRef((props,ref) =>{

    const token = localStorage.getItem("tokenLocal");
    const [cobrar, setCobrar] = useState([]);
    const [pagar, setPagar] = useState([]);
    const [bancos, setBancos] = useState([]);


    useEffect(()=>{
        get_cobrar();
        get_pagar();
        get_bancos();
    },[]);

    const get_cobrar = ()=>{
        axios.get("http://localhost:8000/cash_flow/reportes_indicadores/cobrar",{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            setCobrar(response.data);
        })
    }

    const get_pagar = ()=>{
        axios.get("http://localhost:8000/cash_flow/reportes_indicadores/pagar",{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            setPagar(response.data);
        })
    }

    const get_bancos = ()=>{
        axios.get("http://localhost:8000/cash_flow/reportes_indicadores/banco",{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            setBancos(response.data);
        })
    }

    return(
        <div ref={ref}>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th>Cuentas por cobrar</th>
                                <th>Semana</th>
                                <th>Semana</th>
                                <th>Semana</th>
                                <th>Semana</th>
                                <th>Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cobrar.length > 0 ?
                                (cobrar.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.razon_social}</td>
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
                            <tr>
                                <td>Total Cuentas por cobrar</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th>Cuentas por pagar</th>
                                <th>Semana</th>
                                <th>Semana</th>
                                <th>Semana</th>
                                <th>Semana</th>
                                <th>Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagar.length > 0 ?
                                (pagar.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.razon_social}</td>
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
                            <tr>
                                <td>Total Cuentas por cobrar</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th>Bancos</th>
                                <th>Semana</th>
                                <th>Semana</th>
                                <th>Semana</th>
                                <th>Semana</th>
                                <th>Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bancos.length > 0 ?
                                (bancos.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.razon_social}</td>
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
                            <tr>
                                <td>Total Cuentas por cobrar</td>
                            </tr>
                        </tbody>
                    </Table>
                </Form.Group>
            </Form>
        </div>
    );
})
