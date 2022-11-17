import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReporteIndicadores } from './ReporteIndicadores'
import { useReactToPrint } from 'react-to-print';
import { Button } from 'react-bootstrap';

export default function MenuIndicadores() {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [mes, setMes] = useState("");

    const meses = [{ num: 1, mes: "Enero" }, { num: 2, mes: "Febrero" }, { num: 3, mes: "Marzo" }, { num: 4, mes: "Abril" }, { num: 5, mes: "Mayo" }, { num: 6, mes: "Junio" }, { num: 7, mes: "Julio" }, { num: 8, mes: "Agosto" }, { num: 9, mes: "Septiembre" }, { num: 10, mes: "Octubre" }, { num: 11, mes: "Noviembre" }, { num: 12, mes: "Diciembre" }
    ]

    useEffect(() => {console.log(mes)},[mes]);

    return (
        <div>
            <div style={{ position: "relative", left: "0", paddingTop:"20px" }}>
                <Link to="/home"><button style={{ padding: "15px 40px", fontSize: "16px", borderRadius: "30px", border: "none", background: "#dadada", cursor: "pointer", margin: "0 20px 0 20px" }}>
                    Home
                </button></Link>
            </div>
            <div style={{ display: "flex" }}>
                <div style={{ margin: "2vh 2vh" }}>
                    <label>Reporte de:</label>
                    <select onChange={(e) => setMes(e.target.value !== "Elija un mes" ? e.target.value : null)}>
                        <option>Elija un mes</option>
                        {meses.length > 0 ?
                            (meses.map((value) =>
                                <option value={value.num}>{value.mes}</option>
                            )) : (
                                <option value={"0"}>Sin opciones</option>
                            )
                        }
                    </select>
                </div>
                <div>
                    {mes!=="" && mes!=null ? <Button onClick={handlePrint}>Imprimir</Button> : <></>}
                </div>
            </div>
            {mes!=="" && mes!=null ? <ReporteIndicadores ref={componentRef} mesUser={mes}/> : <></>}
        </div>
    )
}