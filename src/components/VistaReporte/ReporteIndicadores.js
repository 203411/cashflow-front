import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios';
import { Table} from 'react-bootstrap';
import { Form } from 'react-bootstrap';

export const ReporteIndicadores = React.forwardRef((props,ref) =>{

    const token = localStorage.getItem("tokenLocal");
    const [cobrar, setCobrar] = useState([]);
    const [pagar, setPagar] = useState([]);
    const [bancos, setBancos] = useState([]);
    const [flujo, setFlujo] = useState([]);
    const [mes,setMes] = useState(0);

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
            setCobrar(response.data);
        })
    }

    const get_pagar = ()=>{
        axios.get("http://localhost:8000/cash_flow/reporte_indicadores/pagar/"+mes,{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            setPagar(response.data);
        })
    }

    const get_bancos = ()=>{
        axios.get("http://localhost:8000/cash_flow/reporte_indicadores/banco/"+mes,{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            setBancos(response.data);
        })
    }

    const get_flujoEfectivo = () =>{
        axios.get("http://localhost:8000/cash_flow/reporte_categorias/"+mes,{
            headers:{
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
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
                    <Table>
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
                    <Table>
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
                    <Table>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th>Ingresos</th>
                                <th>Semana</th>
                                <th>Semana</th>
                                <th>Semana</th>
                                <th>Semana</th>
                                <th>Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flujo.length > 0 ?
                                (flujo.map((value,index) => (
                                    <tr key={index}>
                                        <td>Efectivo</td>
                                        <td>{value.cantidadEntrada[0][0]}</td>
                                        <td>{value.cantidadEntrada[0][1]}</td>
                                        <td>{value.cantidadEntrada[0][2]}</td>
                                        <td>{value.cantidadEntrada[0][3]}</td>
                                        <td>{value.cantidadEntrada[0][4]}</td>
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
                                        <td>{value.cantidadEntrada[1][0]}</td>
                                        <td>{value.cantidadEntrada[1][1]}</td>
                                        <td>{value.cantidadEntrada[1][2]}</td>
                                        <td>{value.cantidadEntrada[1][3]}</td>
                                        <td>{value.cantidadEntrada[1][4]}</td>
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
                                        <td>Total Ingresos</td>
                                        <td>{value.cantidadEntrada[2][0] === 1 ? 0 : value.cantidadEntrada[2][0]}</td>
                                        <td>{value.cantidadEntrada[2][1] === 1 ? 0 : value.cantidadEntrada[2][1]}</td>
                                        <td>{value.cantidadEntrada[2][2] === 1 ? 0 : value.cantidadEntrada[2][2]}</td>
                                        <td>{value.cantidadEntrada[2][3] === 1 ? 0 : value.cantidadEntrada[2][3]}</td>
                                        <td>{value.cantidadEntrada[2][4] === 4 ? 0 : value.cantidadEntrada[2][4]}</td>
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
                                {/* <td>Total Cuentas por cobrar</td> */}
                            </tr>
                        </tbody>
                    </Table>
                    <Table>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th>Gastos</th>
                                <th>Semana</th>
                                <th>Semana</th>
                                <th>Semana</th>
                                <th>Semana</th>
                                <th>Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flujo.length > 0 ?
                                (flujo.map((value,index) => (
                                    <tr key={index}>
                                        <td>Costos de Ventas</td>
                                        <td>{value.cantidadSalida[0][0]}</td>
                                        <td>{value.cantidadSalida[0][1]}</td>
                                        <td>{value.cantidadSalida[0][2]}</td>
                                        <td>{value.cantidadSalida[0][3]}</td>
                                        <td>{value.cantidadSalida[0][4]}</td>
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
                                        <td>{value.cantidadSalida[0][0]}</td>
                                        <td>{value.cantidadSalida[0][1]}</td>
                                        <td>{value.cantidadSalida[0][2]}</td>
                                        <td>{value.cantidadSalida[0][3]}</td>
                                        <td>{value.cantidadSalida[0][4]}</td>
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
                                        <td>Total Gastos</td>
                                        <td>{value.cantidadSalida[2][0] === 1 ? 0 : value.cantidadSalida[2][0]}</td>
                                        <td>{value.cantidadSalida[2][1] === 1 ? 0 : value.cantidadSalida[2][1]}</td>
                                        <td>{value.cantidadSalida[2][2] === 1 ? 0 : value.cantidadSalida[2][2]}</td>
                                        <td>{value.cantidadSalida[2][3] === 1 ? 0 : value.cantidadSalida[2][3]}</td>
                                        <td>{value.cantidadSalida[2][4] === 4 ? 0 : value.cantidadSalida[2][4]}</td>
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
                                {/* <td>Total Cuentas por cobrar</td> */}
                            </tr>
                        </tbody>
                    </Table>
                    <Table>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th>Diferencia</th>
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
                                        <td>Total Utilidad</td>
                                        <td>{value.utilidad[0]}</td>
                                        <td>{value.utilidad[1]}</td>
                                        <td>{value.utilidad[2]}</td>
                                        <td>{value.utilidad[3]}</td>
                                        <td>{value.utilidad[4]}</td>
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
                                {/* <td>Total Cuentas por cobrar</td> */}
                            </tr>
                        </tbody>
                    </Table>
                    <Table>
                        <thead>
                        {flujo.length > 0 ?
                                (flujo.map((value,index) => (
                                    <tr key={index}>
                                        <th>Margen Rentabilidad</th>
                                        <th>{value.rentabilidad[0]}%</th>
                                        <th>{value.rentabilidad[1]}%</th>
                                        <th>{value.rentabilidad[2]}%</th>
                                        <th>{value.rentabilidad[3]}%</th>
                                        <th>{value.rentabilidad[4]}%</th>
                                    </tr>
                                ))
                                ) : (
                                    <tr>
                                        <th>Margen Rentabilidad</th>
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
