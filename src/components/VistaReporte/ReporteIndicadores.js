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
                                        <td>{(value.semana1.toString().length > 6 ?
                                                (value.semana1.toString().length>7 ? 
                                                    (value.semana1.toString().length>8 ? 
                                                        value.semana1.toString().substring(0,3)+","+value.semana1.toString().substring(3)
                                                        :value.semana1.toString().substring(0,2)+","+value.semana1.toString().substring(2))
                                                    :value.semana1.toString().substring(0,1)+","+value.semana1.toString().substring(1))
                                                :value.semana1)}
                                        </td>
                                        <td>{(value.semana2.toString().length > 6 ? 
                                                (value.semana2.toString().length>7 ? 
                                                    (value.semana2.toString().length>8 ? 
                                                        value.semana2.toString().substring(0,3)+","+value.semana2.toString().substring(3)
                                                        :value.semana2.toString().substring(0,2)+","+value.semana2.toString().substring(2))
                                                    :value.semana2.toString().substring(0,1)+","+value.semana2.toString().substring(1))
                                                :value.semana2)}
                                        </td>
                                        <td>{(value.semana3.toString().length > 6 ? 
                                                (value.semana3.toString().length>7 ? 
                                                    (value.semana3.toString().length>8 ? 
                                                        value.semana3.toString().substring(0,3)+","+value.semana3.toString().substring(3)
                                                        :value.semana3.toString().substring(0,2)+","+value.semana3.toString().substring(2))
                                                    :value.semana3.toString().substring(0,1)+","+value.semana3.toString().substring(1))
                                                :value.semana3)}
                                        </td>
                                        <td>{(value.semana4.toString().length > 6 ? 
                                                (value.semana4.toString().length>7 ? 
                                                    (value.semana4.toString().length>8 ? 
                                                        value.semana4.toString().substring(0,3)+","+value.semana4.toString().substring(3)
                                                        :value.semana4.toString().substring(0,2)+","+value.semana4.toString().substring(2))
                                                    :value.semana4.toString().substring(0,1)+","+value.semana4.toString().substring(1))
                                                :value.semana4)}
                                        </td>
                                        <td>{(value.semana5.toString().length > 6 ? 
                                                (value.semana5.toString().length>7 ? 
                                                    (value.semana5.toString().length>8 ? 
                                                        value.semana5.toString().substring(0,3)+","+value.semana5.toString().substring(3)
                                                        :value.semana5.toString().substring(0,2)+","+value.semana5.toString().substring(2))
                                                    :value.semana5.toString().substring(0,1)+","+value.semana5.toString().substring(1))
                                                :value.semana5)}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>{(value.semana5.toString().length > 6 ? 
                                                (value.semana5.toString().length>7 ? 
                                                    (value.semana5.toString().length>8 ? 
                                                        value.semana5.toString().substring(0,3)+","+value.semana5.toString().substring(3)
                                                        :value.semana5.toString().substring(0,2)+","+value.semana5.toString().substring(2))
                                                    :value.semana5.toString().substring(0,1)+","+value.semana5.toString().substring(1))
                                                :value.semana5)}
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
                            <tr>
                                <td style={{fontWeight : "bold"}}>Total Cuentas por cobrar</td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalCobrar[0].toString().length > 6 ? 
                                        (totalCobrar[0].toString().length>7 ? 
                                            (totalCobrar[0].toString().length>8 ? 
                                                totalCobrar[0].toString().substring(0,3)+","+totalCobrar[0].toString().substring(3)
                                                :totalCobrar[0].toString().substring(0,2)+","+totalCobrar[0].toString().substring(2))
                                            :totalCobrar[0].toString().substring(0,1)+","+totalCobrar[0].toString().substring(1))
                                        :totalCobrar[0])}
                                </td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalCobrar[1].toString().length > 6 ? 
                                        (totalCobrar[1].toString().length>7 ? 
                                            (totalCobrar[1].toString().length>8 ? 
                                                totalCobrar[1].toString().substring(0,3)+","+totalCobrar[1].toString().substring(3)
                                                :totalCobrar[1].toString().substring(0,2)+","+totalCobrar[1].toString().substring(2))
                                            :totalCobrar[1].toString().substring(0,1)+","+totalCobrar[1].toString().substring(1))
                                        :totalCobrar[1])}
                                </td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalCobrar[2].toString().length > 6 ? 
                                        (totalCobrar[2].toString().length>7 ? 
                                            (totalCobrar[2].toString().length>8 ? 
                                                totalCobrar[2].toString().substring(0,3)+","+totalCobrar[2].toString().substring(3)
                                                :totalCobrar[2].toString().substring(0,2)+","+totalCobrar[2].toString().substring(2))
                                            :totalCobrar[2].toString().substring(0,1)+","+totalCobrar[2].toString().substring(1))
                                        :totalCobrar[2])}
                                </td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalCobrar[3].toString().length > 6 ? 
                                        (totalCobrar[3].toString().length>7 ? 
                                            (totalCobrar[3].toString().length>8 ? 
                                                totalCobrar[3].toString().substring(0,3)+","+totalCobrar[3].toString().substring(3)
                                                :totalCobrar[3].toString().substring(0,2)+","+totalCobrar[3].toString().substring(2))
                                            :totalCobrar[3].toString().substring(0,1)+","+totalCobrar[3].toString().substring(1))
                                        :totalCobrar[3])}
                                </td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalCobrar[4].toString().length > 6 ? 
                                        (totalCobrar[4].toString().length>7 ? 
                                            (totalCobrar[4].toString().length>8 ? 
                                                totalCobrar[4].toString().substring(0,3)+","+totalCobrar[4].toString().substring(3)
                                                :totalCobrar[4].toString().substring(0,2)+","+totalCobrar[4].toString().substring(2))
                                            :totalCobrar[4].toString().substring(0,1)+","+totalCobrar[4].toString().substring(1))
                                        :totalCobrar[4])}
                                </td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalCobrar[5].toString().length > 6 ? 
                                        (totalCobrar[5].toString().length>7 ? 
                                            (totalCobrar[5].toString().length>8 ? 
                                                totalCobrar[5].toString().substring(0,3)+","+totalCobrar[5].toString().substring(3)
                                                :totalCobrar[5].toString().substring(0,2)+","+totalCobrar[5].toString().substring(2))
                                            :totalCobrar[5].toString().substring(0,1)+","+totalCobrar[5].toString().substring(1))
                                        :totalCobrar[5])}
                                </td>
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
                                        <td>{(value.semana1.toString().length > 6 ? 
                                                (value.semana1.toString().length>7 ? 
                                                    (value.semana1.toString().length>8 ? 
                                                        value.semana1.toString().substring(0,3)+","+value.semana1.toString().substring(3)
                                                        :value.semana1.toString().substring(0,2)+","+value.semana1.toString().substring(2))
                                                    :value.semana1.toString().substring(0,1)+","+value.semana1.toString().substring(1))
                                                :value.semana1)}
                                        </td>
                                        <td>{(value.semana2.toString().length > 6 ? 
                                                (value.semana2.toString().length>7 ? 
                                                    (value.semana2.toString().length>8 ? 
                                                        value.semana2.toString().substring(0,3)+","+value.semana2.toString().substring(3)
                                                        :value.semana2.toString().substring(0,2)+","+value.semana2.toString().substring(2))
                                                    :value.semana2.toString().substring(0,1)+","+value.semana2.toString().substring(1))
                                                :value.semana2)}
                                        </td>
                                        <td>{(value.semana3.toString().length > 6 ? 
                                                (value.semana3.toString().length>7 ? 
                                                    (value.semana3.toString().length>8 ? 
                                                        value.semana3.toString().substring(0,3)+","+value.semana3.toString().substring(3)
                                                        :value.semana3.toString().substring(0,2)+","+value.semana3.toString().substring(2))
                                                    :value.semana3.toString().substring(0,1)+","+value.semana3.toString().substring(1))
                                                :value.semana3)}
                                        </td>
                                        <td>{(value.semana4.toString().length > 6 ? 
                                                (value.semana4.toString().length>7 ? 
                                                    (value.semana4.toString().length>8 ? 
                                                        value.semana4.toString().substring(0,3)+","+value.semana4.toString().substring(3)
                                                        :value.semana4.toString().substring(0,2)+","+value.semana4.toString().substring(2))
                                                    :value.semana4.toString().substring(0,1)+","+value.semana4.toString().substring(1))
                                                :value.semana4)}
                                        </td>
                                        <td>{(value.semana5.toString().length > 6 ? 
                                                (value.semana5.toString().length>7 ? 
                                                    (value.semana5.toString().length>8 ? 
                                                        value.semana5.toString().substring(0,3)+","+value.semana5.toString().substring(3)
                                                        :value.semana5.toString().substring(0,2)+","+value.semana5.toString().substring(2))
                                                    :value.semana5.toString().substring(0,1)+","+value.semana5.toString().substring(1))
                                                :value.semana5)}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>{(value.semana5.toString().length > 6 ? 
                                                (value.semana5.toString().length>7 ? 
                                                    (value.semana5.toString().length>8 ? 
                                                        value.semana5.toString().substring(0,3)+","+value.semana5.toString().substring(3)
                                                        :value.semana5.toString().substring(0,2)+","+value.semana5.toString().substring(2))
                                                    :value.semana5.toString().substring(0,1)+","+value.semana5.toString().substring(1))
                                                :value.semana5)}
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
                            <tr>
                                <td style={{fontWeight : "bold"}}>Total Cuentas por pagar</td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalPagar[0].toString().length > 6 ? 
                                        (totalPagar[0].toString().length>7 ? 
                                            (totalPagar[0].toString().length>8 ? 
                                                totalPagar[0].toString().substring(0,3)+","+totalPagar[0].toString().substring(3)
                                                :totalPagar[0].toString().substring(0,2)+","+totalPagar[0].toString().substring(2))
                                            :totalPagar[0].toString().substring(0,1)+","+totalPagar[0].toString().substring(1))
                                        :totalPagar[0])}
                                </td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalPagar[1].toString().length > 6 ? 
                                        (totalPagar[1].toString().length>7 ? 
                                            (totalPagar[1].toString().length>8 ? 
                                                totalPagar[1].toString().substring(0,3)+","+totalPagar[1].toString().substring(3)
                                                :totalPagar[1].toString().substring(0,2)+","+totalPagar[1].toString().substring(2))
                                            :totalPagar[1].toString().substring(0,1)+","+totalPagar[1].toString().substring(1))
                                        :totalPagar[1])}
                                </td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalPagar[2].toString().length > 6 ? 
                                        (totalPagar[2].toString().length>7 ? 
                                            (totalPagar[2].toString().length>8 ? 
                                                totalPagar[2].toString().substring(0,3)+","+totalPagar[2].toString().substring(3)
                                                :totalPagar[2].toString().substring(0,2)+","+totalPagar[2].toString().substring(2))
                                            :totalPagar[2].toString().substring(0,1)+","+totalPagar[2].toString().substring(1))
                                        :totalPagar[2])}
                                </td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalPagar[3].toString().length > 6 ? 
                                        (totalPagar[3].toString().length>7 ? 
                                            (totalPagar[3].toString().length>8 ? 
                                                totalPagar[3].toString().substring(0,3)+","+totalPagar[3].toString().substring(3)
                                                :totalPagar[3].toString().substring(0,2)+","+totalPagar[3].toString().substring(2))
                                            :totalPagar[3].toString().substring(0,1)+","+totalPagar[3].toString().substring(1))
                                        :totalPagar[3])}
                                </td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalPagar[4].toString().length > 6 ? 
                                        (totalPagar[4].toString().length>7 ? 
                                            (totalPagar[4].toString().length>8 ? 
                                                totalPagar[4].toString().substring(0,3)+","+totalPagar[4].toString().substring(3)
                                                :totalPagar[4].toString().substring(0,2)+","+totalPagar[4].toString().substring(2))
                                            :totalPagar[4].toString().substring(0,1)+","+totalPagar[4].toString().substring(1))
                                        :totalPagar[4])}
                                </td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalPagar[5].toString().length > 6 ? 
                                        (totalPagar[5].toString().length>7 ? 
                                            (totalPagar[5].toString().length>8 ? 
                                                totalPagar[5].toString().substring(0,3)+","+totalPagar[5].toString().substring(3)
                                                :totalPagar[5].toString().substring(0,2)+","+totalPagar[5].toString().substring(2))
                                            :totalPagar[5].toString().substring(0,1)+","+totalPagar[5].toString().substring(1))
                                        :totalPagar[5])}
                                </td>
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
                                        <td>{(value.semana1.toString().length > 6 ? 
                                                (value.semana1.toString().length>7 ? 
                                                    (value.semana1.toString().length>8 ? 
                                                        value.semana1.toString().substring(0,3)+","+value.semana1.toString().substring(3)
                                                        :value.semana1.toString().substring(0,2)+","+value.semana1.toString().substring(2))
                                                    :value.semana1.toString().substring(0,1)+","+value.semana1.toString().substring(1))
                                                :value.semana1)}
                                        </td>
                                        <td>{(value.semana2.toString().length > 6 ? 
                                                (value.semana2.toString().length>7 ? 
                                                    (value.semana2.toString().length>8 ? 
                                                        value.semana2.toString().substring(0,3)+","+value.semana2.toString().substring(3)
                                                        :value.semana2.toString().substring(0,2)+","+value.semana2.toString().substring(2))
                                                    :value.semana2.toString().substring(0,1)+","+value.semana2.toString().substring(1))
                                                :value.semana2)}
                                        </td>
                                        <td>{(value.semana3.toString().length > 6 ? 
                                                (value.semana3.toString().length>7 ? 
                                                    (value.semana3.toString().length>8 ? 
                                                        value.semana3.toString().substring(0,3)+","+value.semana3.toString().substring(3)
                                                        :value.semana3.toString().substring(0,2)+","+value.semana3.toString().substring(2))
                                                    :value.semana3.toString().substring(0,1)+","+value.semana3.toString().substring(1))
                                                :value.semana3)}
                                        </td>
                                        <td>{(value.semana4.toString().length > 6 ? 
                                                (value.semana4.toString().length>7 ? 
                                                    (value.semana4.toString().length>8 ? 
                                                        value.semana4.toString().substring(0,3)+","+value.semana4.toString().substring(3)
                                                        :value.semana4.toString().substring(0,2)+","+value.semana4.toString().substring(2))
                                                    :value.semana4.toString().substring(0,1)+","+value.semana4.toString().substring(1))
                                                :value.semana4)}
                                        </td>
                                        <td>{(value.semana5.toString().length > 6 ? 
                                                (value.semana5.toString().length>7 ? 
                                                    (value.semana5.toString().length>8 ? 
                                                        value.semana5.toString().substring(0,3)+","+value.semana5.toString().substring(3)
                                                        :value.semana5.toString().substring(0,2)+","+value.semana5.toString().substring(2))
                                                    :value.semana5.toString().substring(0,1)+","+value.semana5.toString().substring(1))
                                                :value.semana5)}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>{(value.semana5.toString().length > 6 ? 
                                                (value.semana5.toString().length>7 ? 
                                                    (value.semana5.toString().length>8 ? 
                                                        value.semana5.toString().substring(0,3)+","+value.semana5.toString().substring(3)
                                                        :value.semana5.toString().substring(0,2)+","+value.semana5.toString().substring(2))
                                                    :value.semana5.toString().substring(0,1)+","+value.semana5.toString().substring(1))
                                                :value.semana5)}
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
                            <tr>
                                <td style={{fontWeight : "bold"}}>Total Bancos</td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalBancos[0].toString().length > 6 ? 
                                        (totalBancos[0].toString().length>7 ? 
                                            (totalBancos[0].toString().length>8 ? 
                                                totalBancos[0].toString().substring(0,3)+","+totalBancos[0].toString().substring(3)
                                                :totalBancos[0].toString().substring(0,2)+","+totalBancos[0].toString().substring(2))
                                            :totalBancos[0].toString().substring(0,1)+","+totalBancos[0].toString().substring(1))
                                        :totalBancos[0])}
                                </td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalBancos[1].toString().length > 6 ? 
                                        (totalBancos[1].toString().length>7 ? 
                                            (totalBancos[1].toString().length>8 ? 
                                                totalBancos[1].toString().substring(0,3)+","+totalBancos[1].toString().substring(3)
                                                :totalBancos[1].toString().substring(0,2)+","+totalBancos[1].toString().substring(2))
                                            :totalBancos[1].toString().substring(0,1)+","+totalBancos[1].toString().substring(1))
                                        :totalBancos[1])}
                                </td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalBancos[2].toString().length > 6 ? 
                                        (totalBancos[2].toString().length>7 ? 
                                            (totalBancos[2].toString().length>8 ? 
                                                totalBancos[2].toString().substring(0,3)+","+totalBancos[2].toString().substring(3)
                                                :totalBancos[2].toString().substring(0,2)+","+totalBancos[2].toString().substring(2))
                                            :totalBancos[2].toString().substring(0,1)+","+totalBancos[2].toString().substring(1))
                                        :totalBancos[2])}
                                </td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalBancos[3].toString().length > 6 ? 
                                        (totalBancos[3].toString().length>7 ? 
                                            (totalBancos[3].toString().length>8 ? 
                                                totalBancos[3].toString().substring(0,3)+","+totalBancos[3].toString().substring(3)
                                                :totalBancos[3].toString().substring(0,2)+","+totalBancos[3].toString().substring(2))
                                            :totalBancos[3].toString().substring(0,1)+","+totalBancos[3].toString().substring(1))
                                        :totalBancos[3])}
                                </td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalBancos[4].toString().length > 6 ? 
                                        (totalBancos[4].toString().length>7 ? 
                                            (totalBancos[4].toString().length>8 ? 
                                                totalBancos[4].toString().substring(0,3)+","+totalBancos[4].toString().substring(3)
                                                :totalBancos[4].toString().substring(0,2)+","+totalBancos[4].toString().substring(2))
                                            :totalBancos[4].toString().substring(0,1)+","+totalBancos[4].toString().substring(1))
                                        :totalBancos[4])}
                                </td>
                                <td style={{fontWeight : "bold"}}>
                                    {(totalBancos[5].toString().length > 6 ? 
                                        (totalBancos[5].toString().length>7 ? 
                                            (totalBancos[5].toString().length>8 ? 
                                                totalBancos[5].toString().substring(0,3)+","+totalBancos[5].toString().substring(3)
                                                :totalBancos[5].toString().substring(0,2)+","+totalBancos[5].toString().substring(2))
                                            :totalBancos[5].toString().substring(0,1)+","+totalBancos[5].toString().substring(1))
                                        :totalBancos[5])}
                                </td>
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
                                        <td>
                                            {(value.cantidadEntrada[0][0].toString().length > 6 ? 
                                                (value.cantidadEntrada[0][0].toString().length>7 ? 
                                                    (value.cantidadEntrada[0][0].toString().length>8 ? 
                                                        value.cantidadEntrada[0][0].toString().substring(0,3)+","+value.cantidadEntrada[0][0].toString().substring(3)
                                                        :value.cantidadEntrada[0][0].toString().substring(0,2)+","+value.cantidadEntrada[0][0].toString().substring(2))
                                                    :value.cantidadEntrada[0][0].toString().substring(0,1)+","+value.cantidadEntrada[0][0].toString().substring(1))
                                                :value.cantidadEntrada[0][0])}
                                        </td>
                                        <td>
                                            {(value.cantidadEntrada[0][1].toString().length > 6 ? 
                                                (value.cantidadEntrada[0][1].toString().length>7 ? 
                                                    (value.cantidadEntrada[0][1].toString().length>8 ? 
                                                        value.cantidadEntrada[0][1].toString().substring(0,3)+","+value.cantidadEntrada[0][1].toString().substring(3)
                                                        :value.cantidadEntrada[0][1].toString().substring(0,2)+","+value.cantidadEntrada[0][1].toString().substring(2))
                                                    :value.cantidadEntrada[0][1].toString().substring(0,1)+","+value.cantidadEntrada[0][1].toString().substring(1))
                                                :value.cantidadEntrada[0][1])}
                                        </td>
                                        <td>
                                        {(value.cantidadEntrada[0][2].toString().length > 6 ? 
                                                (value.cantidadEntrada[0][2].toString().length>7 ? 
                                                    (value.cantidadEntrada[0][2].toString().length>8 ? 
                                                        value.cantidadEntrada[0][2].toString().substring(0,3)+","+value.cantidadEntrada[0][2].toString().substring(3)
                                                        :value.cantidadEntrada[0][2].toString().substring(0,2)+","+value.cantidadEntrada[0][2].toString().substring(2))
                                                    :value.cantidadEntrada[0][2].toString().substring(0,1)+","+value.cantidadEntrada[0][2].toString().substring(1))
                                                :value.cantidadEntrada[0][2])}
                                        </td>
                                        <td>
                                            {(value.cantidadEntrada[0][3].toString().length > 6 ? 
                                                (value.cantidadEntrada[0][3].toString().length>7 ? 
                                                    (value.cantidadEntrada[0][3].toString().length>8 ? 
                                                        value.cantidadEntrada[0][3].toString().substring(0,3)+","+value.cantidadEntrada[0][3].toString().substring(3)
                                                        :value.cantidadEntrada[0][3].toString().substring(0,2)+","+value.cantidadEntrada[0][3].toString().substring(2))
                                                    :value.cantidadEntrada[0][3].toString().substring(0,1)+","+value.cantidadEntrada[0][3].toString().substring(1))
                                                :value.cantidadEntrada[0][3])}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>
                                            {(value.cantidadEntrada[0][4].toString().length > 6 ? 
                                                (value.cantidadEntrada[0][4].toString().length>7 ? 
                                                    (value.cantidadEntrada[0][4].toString().length>8 ? 
                                                        value.cantidadEntrada[0][4].toString().substring(0,3)+","+value.cantidadEntrada[0][4].toString().substring(3)
                                                        :value.cantidadEntrada[0][4].toString().substring(0,2)+","+value.cantidadEntrada[0][4].toString().substring(2))
                                                    :value.cantidadEntrada[0][4].toString().substring(0,1)+","+value.cantidadEntrada[0][4].toString().substring(1))
                                                :value.cantidadEntrada[0][4])}
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
                                            {(value.cantidadEntrada[1][0].toString().length > 6 ? 
                                                (value.cantidadEntrada[1][0].toString().length>7 ? 
                                                    (value.cantidadEntrada[1][0].toString().length>8 ? 
                                                        value.cantidadEntrada[1][0].toString().substring(0,3)+","+value.cantidadEntrada[1][0].toString().substring(3)
                                                        :value.cantidadEntrada[1][0].toString().substring(0,2)+","+value.cantidadEntrada[1][0].toString().substring(2))
                                                    :value.cantidadEntrada[1][0].toString().substring(0,1)+","+value.cantidadEntrada[1][0].toString().substring(1))
                                                :value.cantidadEntrada[1][0])}
                                        </td>
                                        <td>
                                            {(value.cantidadEntrada[1][1].toString().length > 6 ? 
                                                (value.cantidadEntrada[1][1].toString().length>7 ? 
                                                    (value.cantidadEntrada[1][1].toString().length>8 ? 
                                                        value.cantidadEntrada[1][1].toString().substring(0,3)+","+value.cantidadEntrada[1][1].toString().substring(3)
                                                        :value.cantidadEntrada[1][1].toString().substring(0,2)+","+value.cantidadEntrada[1][1].toString().substring(2))
                                                    :value.cantidadEntrada[1][1].toString().substring(0,1)+","+value.cantidadEntrada[1][1].toString().substring(1))
                                                :value.cantidadEntrada[1][1])}
                                        </td>
                                        <td>
                                            {(value.cantidadEntrada[1][2].toString().length > 6 ? 
                                                (value.cantidadEntrada[1][2].toString().length>7 ? 
                                                    (value.cantidadEntrada[1][2].toString().length>8 ? 
                                                        value.cantidadEntrada[1][2].toString().substring(0,3)+","+value.cantidadEntrada[1][2].toString().substring(3)
                                                        :value.cantidadEntrada[1][2].toString().substring(0,2)+","+value.cantidadEntrada[1][2].toString().substring(2))
                                                    :value.cantidadEntrada[1][2].toString().substring(0,1)+","+value.cantidadEntrada[1][2].toString().substring(1))
                                                :value.cantidadEntrada[1][2])}
                                        </td>
                                        <td>
                                            {(value.cantidadEntrada[1][3].toString().length > 6 ? 
                                                (value.cantidadEntrada[1][3].toString().length>7 ? 
                                                    (value.cantidadEntrada[1][3].toString().length>8 ? 
                                                        value.cantidadEntrada[1][3].toString().substring(0,3)+","+value.cantidadEntrada[1][3].toString().substring(3)
                                                        :value.cantidadEntrada[1][3].toString().substring(0,2)+","+value.cantidadEntrada[1][3].toString().substring(2))
                                                    :value.cantidadEntrada[1][3].toString().substring(0,1)+","+value.cantidadEntrada[1][3].toString().substring(1))
                                                :value.cantidadEntrada[1][3])}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>
                                            {(value.cantidadEntrada[1][4].toString().length > 6 ? 
                                                (value.cantidadEntrada[1][4].toString().length>7 ? 
                                                    (value.cantidadEntrada[1][4].toString().length>8 ? 
                                                        value.cantidadEntrada[1][4].toString().substring(0,3)+","+value.cantidadEntrada[1][4].toString().substring(3)
                                                        :value.cantidadEntrada[1][4].toString().substring(0,2)+","+value.cantidadEntrada[1][4].toString().substring(2))
                                                    :value.cantidadEntrada[1][4].toString().substring(0,1)+","+value.cantidadEntrada[1][4].toString().substring(1))
                                                :value.cantidadEntrada[1][4])}
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
                                        <td style={{fontWeight : "bold"}}>Total Ingresos</td>
                                        <td style={{fontWeight : "bold"}}>{value.cantidadEntrada[2][0] === 1 ? 0 
                                            :(value.cantidadEntrada[2][0].toString().length>6? 
                                            (value.cantidadEntrada[2][0].toString().length>7? 
                                                (value.cantidadEntrada[2][0].toString().length>8? 
                                                    value.cantidadEntrada[2][0].toString().substring(0,3)+","+value.cantidadEntrada[2][0].toString().substring(3)
                                                    :value.cantidadEntrada[2][0].toString().substring(0,2)+","+value.cantidadEntrada[2][0].toString().substring(2))
                                                :value.cantidadEntrada[2][0].toString().substring(0,1)+","+value.cantidadEntrada[2][0].toString().substring(1))
                                            :value.cantidadEntrada[2][0])}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>{value.cantidadEntrada[2][1] === 1 ? 0 
                                            :(value.cantidadEntrada[2][1].toString().length>6? 
                                            (value.cantidadEntrada[2][1].toString().length>7? 
                                                (value.cantidadEntrada[2][1].toString().length>8? 
                                                    value.cantidadEntrada[2][1].toString().substring(0,3)+","+value.cantidadEntrada[2][1].toString().substring(3)
                                                    :value.cantidadEntrada[2][1].toString().substring(0,2)+","+value.cantidadEntrada[2][1].toString().substring(2))
                                                :value.cantidadEntrada[2][1].toString().substring(0,1)+","+value.cantidadEntrada[2][1].toString().substring(1))
                                            :value.cantidadEntrada[2][1])}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>{value.cantidadEntrada[2][2] === 1 ? 0 
                                            :(value.cantidadEntrada[2][2].toString().length>6? 
                                            (value.cantidadEntrada[2][2].toString().length>7? 
                                                (value.cantidadEntrada[2][2].toString().length>8? 
                                                    value.cantidadEntrada[2][2].toString().substring(0,3)+","+value.cantidadEntrada[2][2].toString().substring(3)
                                                    :value.cantidadEntrada[2][2].toString().substring(0,2)+","+value.cantidadEntrada[2][2].toString().substring(2))
                                                :value.cantidadEntrada[2][2].toString().substring(0,1)+","+value.cantidadEntrada[2][2].toString().substring(1))
                                            :value.cantidadEntrada[2][2])}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>{value.cantidadEntrada[2][3] === 1 ? 0 
                                            :(value.cantidadEntrada[2][3].toString().length>6? 
                                            (value.cantidadEntrada[2][3].toString().length>7? 
                                                (value.cantidadEntrada[2][3].toString().length>8? 
                                                    value.cantidadEntrada[2][3].toString().substring(0,3)+","+value.cantidadEntrada[2][3].toString().substring(3)
                                                    :value.cantidadEntrada[2][3].toString().substring(0,2)+","+value.cantidadEntrada[2][3].toString().substring(2))
                                                :value.cantidadEntrada[2][3].toString().substring(0,1)+","+value.cantidadEntrada[2][3].toString().substring(1))
                                            :value.cantidadEntrada[2][3])}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>{value.cantidadEntrada[2][4] === 4 ? 0 
                                            :(value.cantidadEntrada[2][4].toString().length>6? 
                                            (value.cantidadEntrada[2][4].toString().length>7? 
                                                (value.cantidadEntrada[2][4].toString().length>8? 
                                                    value.cantidadEntrada[2][4].toString().substring(0,3)+","+value.cantidadEntrada[2][4].toString().substring(3)
                                                    :value.cantidadEntrada[2][4].toString().substring(0,2)+","+value.cantidadEntrada[2][4].toString().substring(2))
                                                :value.cantidadEntrada[2][4].toString().substring(0,1)+","+value.cantidadEntrada[2][4].toString().substring(1))
                                            :value.cantidadEntrada[2][4])}
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
                                        <td>
                                            {(value.cantidadSalida[0][0].toString().length > 6 ? 
                                                (value.cantidadSalida[0][0].toString().length>7 ? 
                                                value.cantidadSalida[0][0].toString().substring(0,2)+","+value.cantidadSalida[0][0].toString().substring(2)
                                                    :value.cantidadSalida[0][0].toString().substring(0,1)+","+value.cantidadSalida[0][0].toString().substring(1))
                                                :value.cantidadSalida[0][0])}
                                        </td>
                                        <td>
                                            {(value.cantidadSalida[0][1].toString().length > 6 ? 
                                                (value.cantidadSalida[0][1].toString().length>7 ? 
                                                value.cantidadSalida[0][1].toString().substring(0,2)+","+value.cantidadSalida[0][1].toString().substring(2)
                                                    :value.cantidadSalida[0][1].toString().substring(0,1)+","+value.cantidadSalida[0][1].toString().substring(1))
                                                :value.cantidadSalida[0][1])}
                                        </td>
                                        <td>
                                            {(value.cantidadSalida[0][2].toString().length > 6 ? 
                                                (value.cantidadSalida[0][2].toString().length>7 ? 
                                                value.cantidadSalida[0][2].toString().substring(0,2)+","+value.cantidadSalida[0][2].toString().substring(2)
                                                    :value.cantidadSalida[0][2].toString().substring(0,1)+","+value.cantidadSalida[0][2].toString().substring(1))
                                                :value.cantidadSalida[0][2])}
                                        </td>
                                        <td>
                                            {(value.cantidadSalida[0][3].toString().length > 6 ? 
                                                (value.cantidadSalida[0][3].toString().length>7 ? 
                                                value.cantidadSalida[0][3].toString().substring(0,2)+","+value.cantidadSalida[0][3].toString().substring(2)
                                                    :value.cantidadSalida[0][3].toString().substring(0,1)+","+value.cantidadSalida[0][3].toString().substring(1))
                                                :value.cantidadSalida[0][3])}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>
                                            {(value.cantidadSalida[0][4].toString().length > 6 ? 
                                                (value.cantidadSalida[0][4].toString().length>7 ? 
                                                value.cantidadSalida[0][4].toString().substring(0,2)+","+value.cantidadSalida[0][4].toString().substring(2)
                                                    :value.cantidadSalida[0][4].toString().substring(0,1)+","+value.cantidadSalida[0][4].toString().substring(1))
                                                :value.cantidadSalida[0][4])}
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
                                        <td>Gastos Fijos Operativos</td>
                                        <td>
                                            {(value.cantidadSalida[1][0].toString().length > 6 ? 
                                                (value.cantidadSalida[1][0].toString().length>7 ? 
                                                value.cantidadSalida[1][0].toString().substring(0,2)+","+value.cantidadSalida[1][0].toString().substring(2)
                                                    :value.cantidadSalida[1][0].toString().substring(0,1)+","+value.cantidadSalida[1][0].toString().substring(1))
                                                :value.cantidadSalida[1][0])}
                                        </td>
                                        <td>
                                            {(value.cantidadSalida[1][1].toString().length > 6 ? 
                                                (value.cantidadSalida[1][1].toString().length>7 ? 
                                                value.cantidadSalida[1][1].toString().substring(0,2)+","+value.cantidadSalida[1][1].toString().substring(2)
                                                    :value.cantidadSalida[1][1].toString().substring(0,1)+","+value.cantidadSalida[1][1].toString().substring(1))
                                                :value.cantidadSalida[1][1])}
                                        </td>
                                        <td>
                                            {(value.cantidadSalida[1][2].toString().length > 6 ? 
                                                (value.cantidadSalida[1][2].toString().length>7 ? 
                                                value.cantidadSalida[1][2].toString().substring(0,2)+","+value.cantidadSalida[1][2].toString().substring(2)
                                                    :value.cantidadSalida[1][2].toString().substring(0,1)+","+value.cantidadSalida[1][2].toString().substring(1))
                                                :value.cantidadSalida[1][2])}
                                        </td>
                                        <td>
                                            {(value.cantidadSalida[1][3].toString().length > 6 ? 
                                                (value.cantidadSalida[1][3].toString().length>7 ? 
                                                value.cantidadSalida[1][3].toString().substring(0,2)+","+value.cantidadSalida[1][3].toString().substring(2)
                                                    :value.cantidadSalida[1][3].toString().substring(0,1)+","+value.cantidadSalida[1][3].toString().substring(1))
                                                :value.cantidadSalida[1][3])}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>
                                            {(value.cantidadSalida[1][4].toString().length > 6 ? 
                                                (value.cantidadSalida[1][4].toString().length>7 ? 
                                                value.cantidadSalida[1][4].toString().substring(0,2)+","+value.cantidadSalida[1][4].toString().substring(2)
                                                    :value.cantidadSalida[1][4].toString().substring(0,1)+","+value.cantidadSalida[1][4].toString().substring(1))
                                                :value.cantidadSalida[1][4])}
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
                                        <td style={{fontWeight : "bold"}}>Total Gastos</td>
                                        <td style={{fontWeight : "bold"}}>{value.cantidadSalida[2][0] === 1 ? 0 
                                            :(value.cantidadSalida[2][0].toString().length>6? 
                                            (value.cantidadSalida[2][0].toString().length>7? 
                                                (value.cantidadSalida[2][0].toString().length>8? 
                                                    value.cantidadSalida[2][0].toString().substring(0,3)+","+value.cantidadSalida[2][0].toString().substring(3)
                                                    :value.cantidadSalida[2][0].toString().substring(0,2)+","+value.cantidadSalida[2][0].toString().substring(2))
                                                :value.cantidadSalida[2][0].toString().substring(0,1)+","+value.cantidadSalida[2][0].toString().substring(1))
                                            :value.cantidadSalida[2][0])}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>{value.cantidadSalida[2][1] === 1 ? 0 
                                            :(value.cantidadSalida[2][1].toString().length>6? 
                                            (value.cantidadSalida[2][1].toString().length>7? 
                                                (value.cantidadSalida[2][1].toString().length>8? 
                                                    value.cantidadSalida[2][1].toString().substring(0,3)+","+value.cantidadSalida[2][1].toString().substring(3)
                                                    :value.cantidadSalida[2][1].toString().substring(0,2)+","+value.cantidadSalida[2][1].toString().substring(2))
                                                :value.cantidadSalida[2][1].toString().substring(0,1)+","+value.cantidadSalida[2][1].toString().substring(1))
                                            :value.cantidadSalida[2][1])}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>{value.cantidadSalida[2][2] === 1 ? 0 
                                            :(value.cantidadSalida[2][2].toString().length>6? 
                                            (value.cantidadSalida[2][2].toString().length>7? 
                                                (value.cantidadSalida[2][2].toString().length>8? 
                                                    value.cantidadSalida[2][2].toString().substring(0,3)+","+value.cantidadSalida[2][2].toString().substring(3)
                                                    :value.cantidadSalida[2][2].toString().substring(0,2)+","+value.cantidadSalida[2][2].toString().substring(2))
                                                :value.cantidadSalida[2][2].toString().substring(0,1)+","+value.cantidadSalida[2][2].toString().substring(1))
                                            :value.cantidadSalida[2][2])}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>{value.cantidadSalida[2][3] === 1 ? 0 
                                            :(value.cantidadSalida[2][3].toString().length>6? 
                                            (value.cantidadSalida[2][3].toString().length>7? 
                                                (value.cantidadSalida[2][3].toString().length>8? 
                                                    value.cantidadSalida[2][3].toString().substring(0,3)+","+value.cantidadSalida[2][3].toString().substring(3)
                                                    :value.cantidadSalida[2][3].toString().substring(0,2)+","+value.cantidadSalida[2][3].toString().substring(2))
                                                :value.cantidadSalida[2][3].toString().substring(0,1)+","+value.cantidadSalida[2][3].toString().substring(1))
                                            :value.cantidadSalida[2][3])}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>{value.cantidadSalida[2][4] === 4 ? 0 
                                            :(value.cantidadSalida[2][4].toString().length>6? 
                                            (value.cantidadSalida[2][4].toString().length>7? 
                                                (value.cantidadSalida[2][4].toString().length>8? 
                                                    value.cantidadSalida[2][4].toString().substring(0,3)+","+value.cantidadSalida[2][4].toString().substring(3)
                                                    :value.cantidadSalida[2][4].toString().substring(0,2)+","+value.cantidadSalida[2][4].toString().substring(2))
                                                :value.cantidadSalida[2][4].toString().substring(0,1)+","+value.cantidadSalida[2][4].toString().substring(1))
                                            :value.cantidadSalida[2][4])}
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
                                        <td>Total Utilidad</td>
                                        <td style={{fontWeight : "bold"}}>
                                            {(value.utilidad[0].toString().length > 6 ? 
                                                (value.utilidad[0].toString().length>7 ? 
                                                value.utilidad[0].toString().substring(0,2)+","+value.utilidad[0].toString().substring(2)
                                                    :value.utilidad[0].toString().substring(0,1)+","+value.utilidad[0].toString().substring(1))
                                                :value.utilidad[0])}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>
                                            {(value.utilidad[1].toString().length > 6 ? 
                                                (value.utilidad[1].toString().length>7 ? 
                                                value.utilidad[1].toString().substring(0,2)+","+value.utilidad[1].toString().substring(2)
                                                    :value.utilidad[1].toString().substring(0,1)+","+value.utilidad[1].toString().substring(1))
                                                :value.utilidad[1])}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>
                                            {(value.utilidad[2].toString().length > 6 ? 
                                                (value.utilidad[2].toString().length>7 ? 
                                                value.utilidad[2].toString().substring(0,2)+","+value.utilidad[2].toString().substring(2)
                                                    :value.utilidad[2].toString().substring(0,1)+","+value.utilidad[2].toString().substring(1))
                                                :value.utilidad[2])}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>
                                            {(value.utilidad[3].toString().length > 6 ? 
                                                (value.utilidad[3].toString().length>7 ? 
                                                value.utilidad[3].toString().substring(0,2)+","+value.utilidad[3].toString().substring(2)
                                                    :value.utilidad[3].toString().substring(0,1)+","+value.utilidad[3].toString().substring(1))
                                                :value.utilidad[3])}
                                        </td>
                                        <td style={{fontWeight : "bold"}}>
                                            {(value.utilidad[4].toString().length > 6 ? 
                                                (value.utilidad[4].toString().length>7 ? 
                                                value.utilidad[4].toString().substring(0,2)+","+value.utilidad[4].toString().substring(2)
                                                    :value.utilidad[4].toString().substring(0,1)+","+value.utilidad[4].toString().substring(1))
                                                :value.utilidad[4])}
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
                    <Table>
                        <thead>
                        {flujo.length > 0 ?
                                (flujo.map((value,index) => (
                                    <tr key={index}>
                                        <th style={{fontWeight : "bold"}}>Margen Rentabilidad</th>
                                        <th style={{fontWeight : "bold"}}>{value.rentabilidad[0]}%</th>
                                        <th style={{fontWeight : "bold"}}>{value.rentabilidad[1]}%</th>
                                        <th style={{fontWeight : "bold"}}>{value.rentabilidad[2]}%</th>
                                        <th style={{fontWeight : "bold"}}>{value.rentabilidad[3]}%</th>
                                        <th style={{fontWeight : "bold"}}>{value.rentabilidad[4]}%</th>
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
