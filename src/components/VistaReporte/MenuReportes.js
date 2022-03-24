import React, { useEffect, useRef, useState } from 'react';
import {ReporteIndicadores} from './ReporteIndicadores'
import { useReactToPrint } from 'react-to-print';
import { Button } from 'react-bootstrap';

export default function MenuIndicadores(){
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [mes, setMes] = useState("");

    const meses = [{num : 1,mes : "Enero"},{num : 2,mes : "Febrero"},{num : 3,mes : "Marzo"},{num : 4,mes : "Abril"},{num : 5,mes : "Mayo"},{num : 6,mes : "Junio"},{num : 7,mes : "Julio"},{num : 8,mes : "Agosto"},{num : 9,mes : "Septiembre"},{num : 10,mes : "Octubre"},{num : 11,mes : "Noviembre"},{num : 12,mes : "Diciembre"}
    ]

    useEffect(() => {
        
    }, []);

    return(
        <div>
            <div style={{display: "flex"}}>
                <div style={{margin: "2vh 2vh"}}>
                    <label>Reporte de:</label>
                    <select  onChange={(e)=> setMes(e.target.value)}>
                        <option>Elija un mes</option>
                        {meses.length > 0 ?
                            (meses.map((value) =>
                                <option value={value.num}>{value.mes}</option>
                            )) : (
                                <option value={"0"}>Sin opciones</option>
                            )
                        }
                    </select>
                    {/* <Button onClick={()=>{console.log(mes)}}>Generar reporte</Button> */}
                </div>
                <div>
                    <Button onClick={handlePrint}>Imprimir</Button>
                </div>
            </div>
            <ReporteIndicadores ref={componentRef} mesUser={mes}/>
        </div>
    )
}