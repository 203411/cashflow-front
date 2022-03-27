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
                                <th>Semana</th>
                                <th>Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cobrar.length > 0 ?
                                (cobrar.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.razon_social}</td>
                                        <td>{value.semana1}</td>
                                        <td>{value.semana2}</td>
                                        <td>{value.semana3}</td>
                                        <td>{value.semana4}</td>
                                        <td>{value.semana5}</td>
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
                                <td>{totalCobrar[0]}</td>
                                <td>{totalCobrar[1]}</td>
                                <td>{totalCobrar[2]}</td>
                                <td>{totalCobrar[3]}</td>
                                <td>{totalCobrar[4]}</td>
                                <td>{totalCobrar[5]}</td>
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
                                <th>Semana</th>
                                <th>Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagar.length > 0 ?
                                (pagar.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.razon_social}</td>
                                        <td>{value.semana1}</td>
                                        <td>{value.semana2}</td>
                                        <td>{value.semana3}</td>
                                        <td>{value.semana4}</td>
                                        <td>{value.semana5}</td>
                                        <td>{value.semana5}</td>    
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
                                <td>Total Cuentas por pagar</td>
                                <td>{totalPagar[0]}</td>
                                <td>{totalPagar[1]}</td>
                                <td>{totalPagar[2]}</td>
                                <td>{totalPagar[3]}</td>
                                <td>{totalPagar[4]}</td>
                                <td>{totalPagar[5]}</td>
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
                                <th>Semana</th>
                                <th>Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bancos.length > 0 ?
                                (bancos.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.razon_social}</td>
                                        <td>{value.semana1}</td>
                                        <td>{value.semana2}</td>
                                        <td>{value.semana3}</td>
                                        <td>{value.semana4}</td>
                                        <td>{value.semana5}</td>
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
                                <td>Total Bancos</td>
                                <td>{totalBancos[0]}</td>
                                <td>{totalBancos[1]}</td>
                                <td>{totalBancos[2]}</td>
                                <td>{totalBancos[3]}</td>
                                <td>{totalBancos[4]}</td>
                                <td>{totalBancos[5]}</td>
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
                                        <td>
                                            {value.cantidadEntrada[0][0]}
                                        </td>
                                        <td>
                                            {(value.cantidadEntrada[0][1].toString().length > 6 ? 
                                                "hola"
                                                :value.cantidadEntrada[0][1])}
                                        </td>
                                        <td>
                                            {(value.cantidadEntrada[0][2]/1000 > 1 ?
                                                (value.cantidadEntrada[0][2]/10000 > 1 ?
                                                    (value.cantidadEntrada[0][2]/100000>1?
                                                        (value.cantidadEntrada[0][2]/100000)
                                                        :parseInt(value.cantidadEntrada[0][2]/1000)+"," + parseFloat(value.cantidadEntrada[0][2]-parseInt(value.cantidadEntrada[0][2]/1000)*1000).toFixed(2))
                                                    :parseInt(value.cantidadEntrada[0][2]/1000)+ "," + parseFloat(value.cantidadEntrada[0][2]-parseInt(value.cantidadEntrada[0][2]/1000)*1000).toFixed(2))
                                                :(value.cantidadEntrada[0][2]))}
                                        </td>
                                        <td>
                                            {(value.cantidadEntrada[0][3]/1000 > 1 ?
                                                (value.cantidadEntrada[0][3]/10000 > 1 ?
                                                    (value.cantidadEntrada[0][3]/100000>1?
                                                        (value.cantidadEntrada[0][3]/100000)
                                                        :parseInt(value.cantidadEntrada[0][3]/1000)+"," + parseFloat(value.cantidadEntrada[0][3]-parseInt(value.cantidadEntrada[0][3]/1000)*1000).toFixed(2))
                                                    :parseInt(value.cantidadEntrada[0][3]/1000)+ "," + parseFloat(value.cantidadEntrada[0][3]-parseInt(value.cantidadEntrada[0][3]/1000)*1000).toFixed(2))
                                                :(value.cantidadEntrada[0][3]))}
                                        </td>
                                        <td>
                                            {(value.cantidadEntrada[0][4]/1000 > 1 ?
                                                (value.cantidadEntrada[0][4]/10000 > 1 ?
                                                    (value.cantidadEntrada[0][4]/100000>1?
                                                        (value.cantidadEntrada[0][4]/100000)
                                                        :parseInt(value.cantidadEntrada[0][4]/1000)+"," + parseFloat(value.cantidadEntrada[0][4]-parseInt(value.cantidadEntrada[0][4]/1000)*1000).toFixed(2))
                                                    :parseInt(value.cantidadEntrada[0][4]/1000)+ "," + parseFloat(value.cantidadEntrada[0][4]-parseInt(value.cantidadEntrada[0][4]/1000)*1000).toFixed(2))
                                                :(value.cantidadEntrada[0][4]))}
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
                            {flujo.length > 0 ?
                                (flujo.map((value,index) => (
                                    <tr key={index}>
                                        <td>Tarjeta de Crédito</td>
                                        <td>
                                            {(value.cantidadEntrada[1][0]/1000 > 1 ?
                                                (value.cantidadEntrada[1][0]/10000 > 1 ?
                                                    (value.cantidadEntrada[1][0]/100000>1?
                                                        (value.cantidadEntrada[1][0]/100000)
                                                        :parseInt(value.cantidadEntrada[1][0]/1000)+"," + parseFloat(value.cantidadEntrada[1][0]-parseInt(value.cantidadEntrada[1][0]/1000)*1000).toFixed(2))
                                                    :parseInt(value.cantidadEntrada[1][0]/1000)+ "," + parseFloat(value.cantidadEntrada[1][0]-parseInt(value.cantidadEntrada[1][0]/1000)*1000).toFixed(2))
                                                :(value.cantidadEntrada[1][0]))}
                                        </td>
                                        <td>
                                            {(value.cantidadEntrada[1][1]/1000 > 1 ?
                                                (value.cantidadEntrada[1][1]/10000 > 1 ?
                                                    (value.cantidadEntrada[1][1]/100000>1?
                                                        (value.cantidadEntrada[1][1]/100000)
                                                        :parseInt(value.cantidadEntrada[1][1]/1000)+","+ (parseFloat(value.cantidadEntrada[1][1]-parseInt(value.cantidadEntrada[1][1]/1000)*1000).toFixed(2) > 100 ? parseFloat(value.cantidadEntrada[1][1]-parseInt(value.cantidadEntrada[1][1]/1000)*1000).toFixed(2) : "0"+parseFloat(value.cantidadEntrada[1][1]-parseInt(value.cantidadEntrada[1][1]/1000)*1000).toFixed(2)))
                                                    :parseInt(value.cantidadEntrada[1][1]/1000)+","+ (parseFloat(value.cantidadEntrada[1][1]-parseInt(value.cantidadEntrada[1][1]/1000)*1000).toFixed(2) > 100 ? parseFloat(value.cantidadEntrada[1][1]-parseInt(value.cantidadEntrada[1][1]/1000)*1000).toFixed(2) : "0"+parseFloat(value.cantidadEntrada[1][1]-parseInt(value.cantidadEntrada[1][1]/1000)*1000).toFixed(2)))
                                                :(value.cantidadEntrada[1][1]))}
                                        </td>
                                        {/* <td>{value.cantidadEntrada[1][1]}</td> */}
                                        <td>
                                            {(value.cantidadEntrada[1][2]/1000 > 1 ?
                                                (value.cantidadEntrada[1][2]/10000 > 1 ?
                                                    (value.cantidadEntrada[1][2]/100000>1?
                                                        (value.cantidadEntrada[1][2]/100000)
                                                        :parseInt(value.cantidadEntrada[1][2]/1000)+"," + parseFloat(value.cantidadEntrada[1][2]-parseInt(value.cantidadEntrada[1][2]/1000)*1000).toFixed(2))
                                                    :parseInt(value.cantidadEntrada[1][2]/1000)+ "," + parseFloat(value.cantidadEntrada[1][2]-parseInt(value.cantidadEntrada[1][2]/1000)*1000).toFixed(2))
                                                :(value.cantidadEntrada[1][2]))}
                                        </td>
                                        <td>
                                            {(value.cantidadEntrada[1][3]/1000 > 1 ?
                                                (value.cantidadEntrada[1][3]/10000 > 1 ?
                                                    (value.cantidadEntrada[1][3]/100000>1?
                                                        (value.cantidadEntrada[1][3]/100000)
                                                        :parseInt(value.cantidadEntrada[1][3]/1000)+"," + parseFloat(value.cantidadEntrada[1][3]-parseInt(value.cantidadEntrada[1][3]/1000)*1000).toFixed(2))
                                                    :parseInt(value.cantidadEntrada[1][3]/1000)+ "," + parseFloat(value.cantidadEntrada[1][3]-parseInt(value.cantidadEntrada[1][3]/1000)*1000).toFixed(2))
                                                :(value.cantidadEntrada[1][3]))}
                                        </td>
                                        <td>
                                            {(value.cantidadEntrada[1][4]/1000 > 1 ?
                                                (value.cantidadEntrada[1][4]/10000 > 1 ?
                                                    (value.cantidadEntrada[1][4]/100000>1?
                                                        (value.cantidadEntrada[1][4]/100000)
                                                        :parseInt(value.cantidadEntrada[1][4]/1000)+"," + parseFloat(value.cantidadEntrada[1][4]-parseInt(value.cantidadEntrada[1][4]/1000)*1000).toFixed(2))
                                                    :parseInt(value.cantidadEntrada[1][4]/1000)+ "," + parseFloat(value.cantidadEntrada[1][4]-parseInt(value.cantidadEntrada[1][4]/1000)*1000).toFixed(2))
                                                :(value.cantidadEntrada[1][4]))}
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
                            {flujo.length > 0 ?
                                (flujo.map((value,index) => (
                                    <tr key={index}>
                                        <td>Total Ingresos</td>
                                        <td>
                                            {value.cantidadEntrada[2][0] === 1 ? 0 
                                            :(value.cantidadEntrada[2][0]/1000 > 1 ?
                                                (value.cantidadEntrada[2][0]/10000 > 1 ?
                                                    (value.cantidadEntrada[2][0]/100000>1?
                                                        (value.cantidadEntrada[2][0]/100000)
                                                        :parseInt(value.cantidadEntrada[2][0]/1000)+"," + parseFloat(value.cantidadEntrada[2][0]-parseInt(value.cantidadEntrada[2][0]/1000)*1000).toFixed(2))
                                                    :parseInt(value.cantidadEntrada[2][0]/1000)+ "," + parseFloat(value.cantidadEntrada[2][0]-parseInt(value.cantidadEntrada[2][0]/1000)*1000).toFixed(2))
                                                :(value.cantidadEntrada[2][0]))}
                                        </td>
                                        <td>
                                            {value.cantidadEntrada[2][1] === 1 ? 0 
                                            :(value.cantidadEntrada[2][1]/1000 > 1 ?
                                                (value.cantidadEntrada[2][1]/10000 > 1 ?
                                                    (value.cantidadEntrada[2][1]/100000>1?
                                                        (value.cantidadEntrada[2][1]/100000)
                                                        :parseInt(value.cantidadEntrada[2][1]/1000)+"," + parseFloat(value.cantidadEntrada[2][1]-parseInt(value.cantidadEntrada[2][1]/1000)*1000).toFixed(2))
                                                    :parseInt(value.cantidadEntrada[2][1]/1000)+ "," + parseFloat(value.cantidadEntrada[2][1]-parseInt(value.cantidadEntrada[2][1]/1000)*1000).toFixed(2))
                                                :(value.cantidadEntrada[2][1]))}
                                        </td>
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
                                        <td>
                                            {(value.cantidadSalida[0][2]/1000 > 1 ?
                                                (value.cantidadSalida[0][2]/10000 > 1 ?
                                                    (value.cantidadSalida[0][2]/100000>1?
                                                        (value.cantidadSalida[0][2]/100000)
                                                        :parseInt(value.cantidadSalida[0][2]/1000)+"," + parseFloat(value.cantidadSalida[0][2]-parseInt(value.cantidadSalida[0][2]/1000)*1000).toFixed(2))
                                                    :parseInt(value.cantidadSalida[0][2]/1000)+ "," + parseFloat(value.cantidadSalida[0][2]-parseInt(value.cantidadSalida[0][2]/1000)*1000).toFixed(2))
                                                :(value.cantidadSalida[0][2]))}
                                        </td>
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
                                        <td>{value.cantidadSalida[1][0]}</td>
                                        <td>{value.cantidadSalida[1][1]}</td>
                                        <td>{value.cantidadSalida[1][2]}</td>
                                        <td>{value.cantidadSalida[1][3]}</td>
                                        <td>{value.cantidadSalida[1][4]}</td>
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
