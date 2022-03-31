import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios';
import { Table} from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import ReporteCss from './Reporte.module.css'

export const ReporteIndicadores = React.forwardRef((props,ref) =>{

    const token = localStorage.getItem("tokenLocal");
    const [cobrar, setCobrar] = useState([]);
    const [pagar, setPagar] = useState([]);
    const [bancos, setBancos] = useState([]);
    const [flujo, setFlujo] = useState([]);
    const [mes,setMes] = useState(0);
    const [totalPagar, setTotalPagar] = useState([0,0,0,0,0,0]);
    const [totalCobrar, setTotalCobrar] = useState([0,0,0,0,0,0]);
    const [totalBancos, setTotalBancos] = useState([0,0,0,0,0,0]);

    useEffect(()=>{
        setMes(props.mesUser)
    },[props])

    useEffect(()=>{
        if(mes!=0){
            get_cobrar();
            get_pagar();
            get_bancos();
            get_flujoEfectivo();
        }
    },[mes])

    const get_cobrar = ()=>{
        axios.get("http://localhost:8000/cash_flow/reporte_indicadores/cobrar/"+mes,{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            setCobrar(response.data[0].cobrar);
            setTotalCobrar(response.data[0].totales)
        })
    }

    const get_pagar = ()=>{
        axios.get("http://localhost:8000/cash_flow/reporte_indicadores/pagar/"+mes,{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            setPagar(response.data[0].pagar);
            setTotalPagar(response.data[0].totales)
        })
    }

    const get_bancos = ()=>{
        axios.get("http://localhost:8000/cash_flow/reporte_indicadores/banco/"+mes,{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            setBancos(response.data[0].bancos);
            setTotalBancos(response.data[0].totales)
        })
    }

    const get_flujoEfectivo = () =>{
        axios.get("http://localhost:8000/cash_flow/reporte_categorias/"+mes,{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            console.log(response.data)
            setFlujo(response.data);
        })
    }

    return(
        <div ref={ref}>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Table>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th style={{fontWeight : "bold",fontSize : "25px"}}>Cuentas por cobrar</th>
                                <th style={{fontWeight : "bold"}}>Semana 1</th>
                                <th style={{fontWeight : "bold"}}>Semana 2</th>
                                <th style={{fontWeight : "bold"}}>Semana 3</th>
                                <th style={{fontWeight : "bold"}}>Semana 4</th>
                                <th style={{fontWeight : "bold"}}>Semana 5</th>
                                <th style={{fontWeight : "bold"}}>Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cobrar.length > 0 ?
                                (cobrar.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.razon_social}</td>
                                        <td>${parseInt(value.semana1).toLocaleString('en-US')+'.'+value.semana1.split('.')[1]}</td>
                                        <td>${parseInt(value.semana2).toLocaleString('en-US')+'.'+value.semana2.split('.')[1]}</td>
                                        <td>${parseInt(value.semana3).toLocaleString('en-US')+'.'+value.semana3.split('.')[1]}</td>
                                        <td>${parseInt(value.semana4).toLocaleString('en-US')+'.'+value.semana4.split('.')[1]}</td>
                                        <td>${parseInt(value.semana5).toLocaleString('en-US')+'.'+value.semana5.split('.')[1]}</td>
                                        <td style={{fontWeight : "bold"}}>${parseInt(value.semana5).toLocaleString('en-US')+'.'+value.semana5.split('.')[1]}</td>
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
                                <td style={{fontWeight : "bold"}}>Total Cuentas por cobrar</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalCobrar[0]).toLocaleString('en-US')+'.'+parseFloat(totalCobrar[0]).toFixed(2).split('.')[1]}</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalCobrar[1]).toLocaleString('en-US')+'.'+parseFloat(totalCobrar[1]).toFixed(2).split('.')[1]}</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalCobrar[2]).toLocaleString('en-US')+'.'+parseFloat(totalCobrar[2]).toFixed(2).split('.')[1]}</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalCobrar[3]).toLocaleString('en-US')+'.'+parseFloat(totalCobrar[3]).toFixed(2).split('.')[1]}</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalCobrar[4]).toLocaleString('en-US')+'.'+parseFloat(totalCobrar[4]).toFixed(2).split('.')[1]}</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalCobrar[5]).toLocaleString('en-US')+'.'+parseFloat(totalCobrar[5]).toFixed(2).split('.')[1]}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}  
                                <th  style={{fontWeight : "bold",fontSize : "25px"}}>Cuentas por pagar</th>
                                <th  style={{fontWeight : "bold"}}>Semana 1</th>
                                <th  style={{fontWeight : "bold"}}>Semana 2</th>
                                <th  style={{fontWeight : "bold"}}>Semana 3</th>
                                <th  style={{fontWeight : "bold"}}>Semana 4</th>
                                <th  style={{fontWeight : "bold"}}>Semana 5</th>
                                <th  style={{fontWeight : "bold"}}>Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagar.length > 0 ?
                                (pagar.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.razon_social}</td>
                                        <td>${parseInt(value.semana1).toLocaleString('en-US')+'.'+value.semana1.split('.')[1]}</td>
                                        <td>${parseInt(value.semana2).toLocaleString('en-US')+'.'+value.semana2.split('.')[1]}</td>
                                        <td>${parseInt(value.semana3).toLocaleString('en-US')+'.'+value.semana3.split('.')[1]}</td>
                                        <td>${parseInt(value.semana4).toLocaleString('en-US')+'.'+value.semana4.split('.')[1]}</td>
                                        <td>${parseInt(value.semana5).toLocaleString('en-US')+'.'+value.semana5.split('.')[1]}</td>
                                        <td style={{fontWeight : "bold"}}>${parseInt(value.semana5).toLocaleString('en-US')+'.'+value.semana5.split('.')[1]}</td>
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
                                <td style={{fontWeight : "bold"}}>Total Cuentas por pagar</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalPagar[0]).toLocaleString('en-US')+'.'+parseFloat(totalPagar[0]).toFixed(2).split('.')[1]}</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalPagar[1]).toLocaleString('en-US')+'.'+parseFloat(totalPagar[1]).toFixed(2).split('.')[1]}</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalPagar[2]).toLocaleString('en-US')+'.'+parseFloat(totalPagar[2]).toFixed(2).split('.')[1]}</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalPagar[3]).toLocaleString('en-US')+'.'+parseFloat(totalPagar[3]).toFixed(2).split('.')[1]}</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalPagar[4]).toLocaleString('en-US')+'.'+parseFloat(totalPagar[4]).toFixed(2).split('.')[1]}</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalPagar[5]).toLocaleString('en-US')+'.'+parseFloat(totalPagar[5]).toFixed(2).split('.')[1]}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th style={{fontWeight : "bold",fontSize : "25px"}}>Bancos</th>
                                <th style={{fontWeight : "bold"}}>Semana 1</th>
                                <th style={{fontWeight : "bold"}}>Semana 2</th>
                                <th style={{fontWeight : "bold"}}>Semana 3</th>
                                <th style={{fontWeight : "bold"}}>Semana 4</th>
                                <th style={{fontWeight : "bold"}}>Semana 5</th>
                                <th style={{fontWeight : "bold"}}>Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bancos.length > 0 ?
                                (bancos.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.razon_social}</td>
                                        <td>${parseInt(value.semana1).toLocaleString('en-US') +'.'+value.semana1.split('.')[1]}</td>
                                        <td>${parseInt(value.semana2).toLocaleString('en-US') +'.'+value.semana2.split('.')[1]}</td>
                                        <td>${parseInt(value.semana3).toLocaleString('en-US') +'.'+value.semana3.split('.')[1]}</td>
                                        <td>${parseInt(value.semana4).toLocaleString('en-US') +'.'+value.semana4.split('.')[1]}</td>
                                        <td>${parseInt(value.semana5).toLocaleString('en-US') +'.'+value.semana5.split('.')[1]}</td>
                                        <td style={{fontWeight : "bold"}}>${parseInt(value.semana5).toLocaleString('en-US') +'.'+value.semana5.split('.')[1]}</td>
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
                                <td style={{fontWeight : "bold"}}>Total Bancos</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalBancos[0]).toLocaleString('en-US')+'.'+parseFloat(totalBancos[0]).toFixed(2).split('.')[1]}</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalBancos[1]).toLocaleString('en-US')+'.'+parseFloat(totalBancos[1]).toFixed(2).split('.')[1]}</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalBancos[2]).toLocaleString('en-US')+'.'+parseFloat(totalBancos[2]).toFixed(2).split('.')[1]}</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalBancos[3]).toLocaleString('en-US')+'.'+parseFloat(totalBancos[3]).toFixed(2).split('.')[1]}</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalBancos[4]).toLocaleString('en-US')+'.'+parseFloat(totalBancos[4]).toFixed(2).split('.')[1]}</td>
                                <td style={{fontWeight : "bold"}}>${parseInt(totalBancos[5]).toLocaleString('en-US')+'.'+parseFloat(totalBancos[5]).toFixed(2).split('.')[1]}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th style={{fontWeight : "bold",fontSize : "25px"}}>Ingresos</th>
                                <th style={{fontWeight : "bold"}}>Semana 1</th>
                                <th style={{fontWeight : "bold"}}>Semana 2</th>
                                <th style={{fontWeight : "bold"}}>Semana 3</th>
                                <th style={{fontWeight : "bold"}}>Semana 4</th>
                                <th style={{fontWeight : "bold"}}>Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flujo.length > 0 ?
                                (flujo.map((value,index) => (
                                    <tr key={index}>
                                        <td>Efectivo</td>
                                        <td>${parseInt(value.cantidadEntrada[0][0]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadEntrada[0][0]).toFixed(2).split('.')[1]}</td>
                                        <td>${parseInt(value.cantidadEntrada[0][1]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadEntrada[0][1]).toFixed(2).split('.')[1]}</td>
                                        <td>${parseInt(value.cantidadEntrada[0][2]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadEntrada[0][2]).toFixed(2).split('.')[1]}</td>
                                        <td>${parseInt(value.cantidadEntrada[0][3]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadEntrada[0][3]).toFixed(2).split('.')[1]}</td>
                                        <td style={{fontWeight : "bold"}}>${parseInt(value.cantidadEntrada[0][4]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadEntrada[0][4]).toFixed(2).split('.')[1]}</td>
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
                            {flujo.length > 0 ?
                                (flujo.map((value,index) => (
                                    <tr key={index}>
                                        <td>Tarjeta de Crédito</td>
                                        <td>${parseInt(value.cantidadEntrada[1][0]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadEntrada[1][0]).toFixed(2).split('.')[1]}</td>
                                        <td>${parseInt(value.cantidadEntrada[1][1]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadEntrada[1][1]).toFixed(2).split('.')[1]}</td>
                                        <td>${parseInt(value.cantidadEntrada[1][2]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadEntrada[1][2]).toFixed(2).split('.')[1]}</td>
                                        <td>${parseInt(value.cantidadEntrada[1][3]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadEntrada[1][3]).toFixed(2).split('.')[1]}</td>
                                        <td style={{fontWeight : "bold"}}>${parseInt(value.cantidadEntrada[1][4]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadEntrada[1][4]).toFixed(2).split('.')[1]}</td>
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
                            {flujo.length > 0 ?
                                (flujo.map((value,index) => (
                                    <tr key={index}>
                                        <td style={{fontWeight : "bold"}}>Total Ingresos</td>
                                        <td style={{fontWeight : "bold"}}>${value.cantidadEntrada[2][0] === 1 ? "0.00" : parseInt(value.cantidadEntrada[2][0]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadEntrada[2][0]).toFixed(2).split('.')[1]}</td>
                                        <td style={{fontWeight : "bold"}}>${value.cantidadEntrada[2][1] === 1 ? "0.00" : parseInt(value.cantidadEntrada[2][1]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadEntrada[2][1]).toFixed(2).split('.')[1]}</td>
                                        <td style={{fontWeight : "bold"}}>${value.cantidadEntrada[2][2] === 1 ? "0.00" : parseInt(value.cantidadEntrada[2][2]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadEntrada[2][2]).toFixed(2).split('.')[1]}</td>
                                        <td style={{fontWeight : "bold"}}>${value.cantidadEntrada[2][3] === 1 ? "0.00" : parseInt(value.cantidadEntrada[2][3]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadEntrada[2][3]).toFixed(2).split('.')[1]}</td>
                                        <td style={{fontWeight : "bold"}}>${value.cantidadEntrada[2][4] === 4 ? "0.00" : parseInt(value.cantidadEntrada[2][4]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadEntrada[2][4]).toFixed(2).split('.')[1]}</td>
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
                    <Table>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th style={{fontWeight : "bold",fontSize : "25px"}}>Gastos</th>
                                <th style={{fontWeight : "bold"}}>Semana 1</th>
                                <th style={{fontWeight : "bold"}}>Semana 2</th>
                                <th style={{fontWeight : "bold"}}>Semana 3</th>
                                <th style={{fontWeight : "bold"}}>Semana 4</th>
                                <th style={{fontWeight : "bold"}}>Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flujo.length > 0 ?
                                (flujo.map((value,index) => (
                                    <tr key={index}>
                                        <td>Costos de Ventas</td>
                                        <td>${parseInt(value.cantidadSalida[0][0]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadSalida[0][0]).toFixed(2).split('.')[1]}</td>
                                        <td>${parseInt(value.cantidadSalida[0][1]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadSalida[0][1]).toFixed(2).split('.')[1]}</td>
                                        <td>${parseInt(value.cantidadSalida[0][2]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadSalida[0][2]).toFixed(2).split('.')[1]}</td>
                                        <td>${parseInt(value.cantidadSalida[0][3]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadSalida[0][3]).toFixed(2).split('.')[1]}</td>
                                        <td style={{fontWeight : "bold"}}>${parseInt(value.cantidadSalida[0][4]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadSalida[0][4]).toFixed(2).split('.')[1]}</td>
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
                            {flujo.length > 0 ?
                                (flujo.map((value,index) => (
                                    <tr key={index}>
                                        <td>Gastos Fijos Operativos</td>
                                        <td>${parseInt(value.cantidadSalida[1][0]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadSalida[1][0]).toFixed(2).split('.')[1]}</td>
                                        <td>${parseInt(value.cantidadSalida[1][1]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadSalida[1][1]).toFixed(2).split('.')[1]}</td>
                                        <td>${parseInt(value.cantidadSalida[1][2]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadSalida[1][2]).toFixed(2).split('.')[1]}</td>
                                        <td>${parseInt(value.cantidadSalida[1][3]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadSalida[1][3]).toFixed(2).split('.')[1]}</td>
                                        <td style={{fontWeight : "bold"}}>${parseInt(value.cantidadSalida[1][4]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadSalida[1][4]).toFixed(2).split('.')[1]}</td>
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
                            {flujo.length > 0 ?
                                (flujo.map((value,index) => (
                                    <tr key={index}>
                                        <td style={{fontWeight : "bold"}}>Total Gastos</td>
                                        <td style={{fontWeight : "bold"}}>${value.cantidadSalida[2][0] === 1 ? "0.00" : parseInt(value.cantidadSalida[2][0]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadSalida[2][0]).toFixed(2).split('.')[1]}</td>
                                        <td style={{fontWeight : "bold"}}>${value.cantidadSalida[2][1] === 1 ? "0.00" : parseInt(value.cantidadSalida[2][1]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadSalida[2][1]).toFixed(2).split('.')[1]}</td>
                                        <td style={{fontWeight : "bold"}}>${value.cantidadSalida[2][2] === 1 ? "0.00" : parseInt(value.cantidadSalida[2][2]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadSalida[2][2]).toFixed(2).split('.')[1]}</td>
                                        <td style={{fontWeight : "bold"}}>${value.cantidadSalida[2][3] === 1 ? "0.00" : parseInt(value.cantidadSalida[2][3]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadSalida[2][3]).toFixed(2).split('.')[1]}</td>
                                        <td style={{fontWeight : "bold"}}>${value.cantidadSalida[2][4] === 4 ? "0.00" : parseInt(value.cantidadSalida[2][4]).toLocaleString('en-US')+'.'+parseFloat(value.cantidadSalida[2][4]).toFixed(2).split('.')[1]}</td>
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
                    <Table>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th style={{fontWeight : "bold",fontSize : "25px"}}>Diferencia</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {flujo.length > 0 ?
                                (flujo.map((value,index) => (
                                    <tr key={index}>
                                        <td style={{fontWeight : "bold"}}>Total Utilidad</td>
                                        <th style={{fontWeight : "bold"}}>${parseInt(value.utilidad[0]).toLocaleString('en-US')+'.'+parseFloat(value.utilidad[0]).toFixed(2).split('.')[1]}</th>
                                        <th style={{fontWeight : "bold"}}>${parseInt(value.utilidad[1]).toLocaleString('en-US')+'.'+parseFloat(value.utilidad[1]).toFixed(2).split('.')[1]}</th>
                                        <th style={{fontWeight : "bold"}}>${parseInt(value.utilidad[2]).toLocaleString('en-US')+'.'+parseFloat(value.utilidad[2]).toFixed(2).split('.')[1]}</th>
                                        <th style={{fontWeight : "bold"}}>${parseInt(value.utilidad[3]).toLocaleString('en-US')+'.'+parseFloat(value.utilidad[3]).toFixed(2).split('.')[1]}</th>
                                        <th style={{fontWeight : "bold"}}>${parseInt(value.utilidad[4]).toLocaleString('en-US')+'.'+parseFloat(value.utilidad[4]).toFixed(2).split('.')[1]}</th>
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
                    <Table>
                        <thead>
                        {flujo.length > 0 ?
                                (flujo.map((value,index) => (
                                    <tr key={index}>
                                        <th style={{fontWeight : "bold"}}>Margen Rentabilidad</th>
                                        <th style={{fontWeight : "bold"}}>{parseInt(value.rentabilidad[0]).toLocaleString('en-US')}%</th>
                                        <th style={{fontWeight : "bold"}}>{parseInt(value.rentabilidad[1]).toLocaleString('en-US')}%</th>
                                        <th style={{fontWeight : "bold"}}>{parseInt(value.rentabilidad[2]).toLocaleString('en-US')}%</th>
                                        <th style={{fontWeight : "bold"}}>{parseInt(value.rentabilidad[3]).toLocaleString('en-US')}%</th>
                                        <th style={{fontWeight : "bold"}}>{parseInt(value.rentabilidad[4]).toLocaleString('en-US')}%</th>
                                    </tr>
                                ))
                                ) : (
                                    <tr>
                                        <th style={{fontWeight : "bold"}}>Margen Rentabilidad</th>
                                        <th>Sin datos</th>
                                    </tr>
                                )
                            }
                        </thead>
                    </Table>
                </Form.Group>
            </Form>
        </div>
    );
})
