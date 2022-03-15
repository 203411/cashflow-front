import React, { Component } from 'react'
import { Dropdown, Table, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

export default class FlujoEfectivo extends Component {




    
    render(){
    return (
    <div className="d-md-flex justify-content-center " style={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(60,49,79,1) 16%, rgba(0,212,255,1) 62%)' }}>



                <Form className='mt-4  ' style={{ background: 'white', padding:'1%', borderRadius: '10px' }}>

                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                <div style={{ textAlign: 'center', fontSize: 'x-large' }}>FlujoEfectivo</div>
                </Form.Group>

                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                <select class="custom-select">
                <option selected>Seleccione la Categoria</option>
                </select>
                </Form.Group>

                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                    <div class="input-group"  aria-label="Descripcion del flujo de efectivo a agregar">
                    <textarea class="form-control" aria-label="With textarea" placeholder="Descripcion acerca del flujo "></textarea>
                    </div>
                </Form.Group>

                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                    </div>
                    <input type="number" class="form-control" placeholder="Cantidad " aria-label="Amount (to the nearest dollar)"  />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 d-inline-flex p-2" controlId="formBasicPassword">
                        <div class="form-check mr-2 ml-5">
                        <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label class="form-check-label" for="flexRadioDefault1">
                            Entrada de efectivo
                        </label>
                        </div>
                        <div class="form-check mr-2 ml-2">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
                        <label class="form-check-label" for="flexRadioDefault2">
                            Salida de efectivo
                        </label>
                        </div>
                
                </Form.Group>

                <div style={{ textAlign:'Center'}} className='mb-3'>
                <Button style={{ borderRadius: '100px', boxShadow : 'none', paddingLeft:'10%',  paddingRight:'10%'}} size="md" block>Registrar</Button>
                </div>    
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Categoria</th>
                        <th>Tipo</th>
                        <th>Descripcion</th>
                        <th>Cantidad</th>
                        </tr>
                    </thead>

                    </Table>
                </Form.Group>

                </Form>
    </div>

    );

}
}
