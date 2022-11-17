import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import CategoriaCss from './Categorias.module.css';
import React, { useEffect, useState } from 'react'
import { Form, Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Categorias() {
    const token = localStorage.getItem('tokenLocal');

    const [idCategoria, setIdCategoria] = useState(-1);
    const [categoria, setCategoria] = useState('');
    const [subCategoria, setSubCategoria] = useState('');

    const [listCategorias, setListCategorias] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (el) => {
        setShow(true)
        rellenarModal(el.id)
    };


    const get_categorias = () => {
        axios
            .get("http://localhost:8000/cash_flow/categorias/options", {
                headers: {
                    'Authorization': 'Token ' + token,
                }
            }).then((response) => {
                // console.log(response.data)
                setListCategorias(response.data)
            }).catch((error) => {
                // console.log(error.data)
            })
    }

    useEffect(() => {
        get_categorias();
    }, []);

    const optionCategoria = ['INGRESO', 'COSTO-VENTA', 'GASTO-AOC']

    const agregar_categoria = () => {
        if ((categoria === "" || categoria === null)&&(subCategoria === "" || subCategoria === null)) {
            alert("Debes rellenar todos los campos")
        } else if (categoria === "" || categoria === null) {
            alert("El campo categoria no puede estar vacio")
        } else if (subCategoria === "" || subCategoria === null) {
            alert("El campo sub-categoria no puede estar vacio")
        } else {
            var postData = {
                descripcion: categoria,
                sub_categoria: subCategoria,
            }

            // console.log(postData)

            axios
                .post("http://localhost:8000/cash_flow/categorias/options", postData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + token,
                    }
                }).then((response) => {
                    console.log(response)
                    get_categorias()
                    document.getElementById("categoria").value = "Seleccione una categoria";
                    document.getElementById("sub_categoria").value = "";
                    setIdCategoria(-1);
                    setCategoria("");
                    setSubCategoria("");
                }).catch((error) => {
                    if (error.response != null) {
                        console.log(error.response.data)
                    }
                })
        }
        // console.log(postData);
    }

    const rellenarModal = (idCategoria) => {
        axios
            .get("http://localhost:8000/cash_flow/categorias/options/" + idCategoria, {
                headers: {
                    'Authorization': 'Token ' + token,
                }
            })
            .then((response) => {
                // console.log(response.data)
                setIdCategoria(response.data.id)
                setCategoria(response.data.descripcion)
                setSubCategoria(response.data.sub_categoria)
                document.getElementById("modalSubcategoria").value = response.data.sub_categoria
                document.getElementById("modalCategoria").value = response.data.descripcion
            })
            .catch((error) => {
                // console.log(error.response.data)
            })
    }

    const editar_categoria = (idCategoria) => {
        if (categoria === "" && subCategoria === "") {
            alert("Debes rellenar todos los campos")
        } else if (categoria === "") {
            alert("El campo categoria no puede estar vacio")
        } else if (subCategoria === "") {
            alert("El campo sub-categoria no puede estar vacio")
        } else {
            var putData = {
                descripcion: categoria,
                sub_categoria: subCategoria,
            }
            axios
                .put("http://localhost:8000/cash_flow/categorias/options/" + idCategoria.idCategoria, putData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + token,
                    }
                })
                .then((response) => {
                    setIdCategoria(-1);
                    setCategoria("");
                    setSubCategoria("");
                    get_categorias()
                    // console.log(response.data)
                })
                .catch((error) => {
                    // console.log(error.response.data)
                })
            handleClose()
        }
    }

    return (
        <div className="d-md-flex justify-content-center " style={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(60,49,79,1) 16%, rgba(0,212,255,1) 62%)' }}>
            <Form className='mt-4, pb-4 ' style={{ background: 'white', padding: '1%', borderRadius: '10px', minWidth: '50%' }}>
                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                    <div style={{ textAlign: 'center', fontSize: 'x-large' }}>Gestion de Categorias</div>
                </Form.Group>
                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                    <label>Categoria:</label>
                    <select class="custom-select" onChange={(e) => setCategoria(e.target.value === 'Seleccione una categoria' ? null : e.target.value)} id="categoria">
                        <option selected>Seleccione una categoria</option>
                        {optionCategoria.length > 0 ?
                            (optionCategoria.map((value) =>
                                <option value={value}>{value}</option>
                            )) : (
                                <option value={"0"}>No hay categorias registradas</option>
                            )
                        }
                    </select>
                </Form.Group>
                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                    <label>Sub-Categoria:</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" onChange={(e) => setSubCategoria(e.target.value)} placeholder="Sub-Categoria " aria-label="Amount (to the nearest dollar)" id="sub_categoria" />
                    </div>
                </Form.Group>
                <div style={{ textAlign: 'Center' }} className='mb-3'>
                    <Button onClick={() => agregar_categoria()} style={{ borderRadius: '100px', boxShadow: 'none', paddingLeft: '10%', paddingRight: '10%' }} size="md" block>Guardar</Button>
                </div>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Table striped bordered hover variant="dark" className={CategoriaCss.tableFixed}>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th style={{ width: "30vh" }}>Categoria</th>
                                <th style={{ width: "45vh" }}>Sub-Categoria</th>
                                <th style={{ width: "20vh" }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listCategorias.length > 0 ?
                                (listCategorias.map((value) => (
                                    <tr key={value.id}>
                                        {/* <td>{value.id}</td> */}
                                        <td style={{ width: "30vh", height: "10vh" }}>{value.descripcion}</td>
                                        <td style={{ width: "45vh", height: "10vh" }}>{value.sub_categoria}</td>
                                        <td style={{ width: "18vh" }}>
                                            <Button className="btn btn-primary btn-sm" style={{ width: "95%" }} onClick={() => handleShow(value)}><FontAwesomeIcon icon={faEdit} /></Button>
                                        </td>
                                    </tr>
                                ))
                                ) : (
                                    <tr>
                                        <td style={{width: "94vh", height:"42vh",textAlign:"center",padding:"20%"}}>
                                            Sin datos
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Form.Group>
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                            <label>Categoria:</label>
                            <select class="custom-select" onChange={(e) => setCategoria(e.target.value)}>
                                {optionCategoria.length > 0 ?
                                    (optionCategoria.map((value) => (value === categoria ? <option value={categoria} selected>{categoria}</option> : <option value={value}>{value}</option>))) : (<option value={"0"}>No hay categorias registradas</option>)
                                }
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                            <label>Sub-Categoria:</label>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" onChange={(e) => setSubCategoria(e.target.value)} placeholder="Sub-Categoria " aria-label="Amount (to the nearest dollar)" id="modalSubcategoria"></input>
                            </div>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-secondary" style={{ borderRadius: '100px', boxShadow: 'none', paddingLeft: '10%', paddingRight: '10%' }} onClick={handleClose}>Cancelar</Button>
                    <Button className="btn btn-primary" style={{ borderRadius: '100px', boxShadow: 'none', paddingLeft: '10%', paddingRight: '10%' }} onClick={() => editar_categoria({ idCategoria })}>Guardar</Button>
                </Modal.Footer>
            </Modal>
            <div className={CategoriaCss.divButton}>
                <Link to="/home">
                    <button className={CategoriaCss.buttonHome}>Home</button>
                </Link>
            </div>
        </div>
    );
}