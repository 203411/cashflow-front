import { useEffect, useState } from 'react';
import { Form, FormFeedback, FormGroup, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StyleLogin from '../UsuarioRegistro/Login.module.css';
import './Register.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

export default function Register() {

  const token = localStorage.getItem('tokenLocal');

  const [idRegistro, setIdRegistro]= useState('');
  const [username, setUsername]= useState('');
  const [password, setPassword]= useState('');
  const [password2, setPassword2]= useState('');
  const [email, setEmail]= useState('');
  const [emailValidate, setEmailValidate]= useState('');
  const [isGerente, setIsGerente]= useState(null);
  const [dropdownOpen, setDropdownOpen]= useState(false);

  const [listRegistro, setListRegistro] = useState([])
  const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (el) => {setShow(true); setIdRegistro(el.id)};

  const get_registros = () => {
    axios
      .get("http://localhost:8000/cash_flow/registro/lista/",{
        headers: {
            'Authorization': 'Token ' + token,
        }
    })
      .then((response) => {
        // console.log(response.data)
        setListRegistro(response.data)
      })
      .catch((error) => {
        // console.log(error.response.data)
      })
  }

  useEffect(() => {
    get_registros();
    document.getElementById("cancelar").hidden = true;
  }, []);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const validateEmail = (e) => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRex.test(e.target.value)) {
      setEmailValidate('has-success');
    } else {
      setEmailValidate('has-danger');
    }
  }

  const submitForm = (e) => {
    e.preventDefault();
  }

  const consumir_register = () => {

    let usuarioNuevo = true;

    for (let index = 0; index < listRegistro.length; index++) {
      const element = listRegistro[index];
      if(idRegistro === element.id){
        // console.log("usuario put")
        usuarioNuevo = false
        peticionPut(element)
        index = listRegistro.length;
      }
    }

    if(usuarioNuevo === true){
      var postData = {
        username: username,
        password: password,
        password2: password2,
        email: email,
        is_superuser: isGerente
      }

      // console.log(postData)

      axios
        .post("http://localhost:8000/cash_flow/registro/lista/", postData, {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
          }
        })
        .then((response) => {
          // console.log(response.data)
          limpiarForm();
          get_registros();
        })
        .catch((error) => {
          // console.log(error.response.data)
          alert("usuario no registrado!");
        })
    }
  }

  const peticionDelete = (user) =>{
    // console.log(user.idRegistro)
    axios
      .delete("http://localhost:8000/cash_flow/registro/user/" + user.idRegistro,{
        headers: { 
          'Authorization': 'Token ' + token,
        }
      })
      .then(() => {
        get_registros();
        alert("Usuario eliminado");
      })
      handleClose();
  }

  const peticionPut = (element) =>{
    // console.log(element.id)}
    var putData = {
      username: username,
      password: password,
      password2: password2,
      email: email,
      is_superuser: isGerente
    }
    axios
      .put("http://localhost:8000/cash_flow/registro/user/" + element.id,putData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token,
        }
      })
      .then((response)=>{
        // console.log(response.data)
        limpiarForm();
        get_registros();
      })

  }

  const rellenarForm = (idUser) =>{
    document.getElementById("cancelar").hidden = false;  //se muestra el boton para cancelar la edicion
    axios
      .get("http://localhost:8000/cash_flow/registro/user/" + idUser.id,{
        headers: { 
          'Authorization': 'Token ' + token,
        }
      })
      .then((response)=>{
        // console.log(response.data)
        setIdRegistro(response.data.id)
        document.getElementById("username").value = response.data.username
        document.getElementById("email").value = response.data.email
        setUsername(response.data.username);
        setEmail(response.data.email);
        setIsGerente(response.data.is_superuser);
      })
  }

  const limpiarForm = () =>{
    //resetear los estados
    setIdRegistro("");
    setUsername("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setIsGerente(null);
    //ocultamos el boton
    document.getElementById("cancelar").hidden = true;
  }

  const inputStyle = {
      borderRadius: '100px',
      padding: '18px 52px'
    };

    return (
      <div className={StyleLogin.body}>
        <br /><br /><br />
        <div className={StyleLogin.background}>
          <h2 className={StyleLogin.title}>Crud usuario</h2>
          <br /><br /><br />
          <Table size="sm">
            <thead>
              <tr>
                {/* <th>#</th> */}
                <th>Username</th>
                <th>Email</th>
                <th>es Gerente?</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listRegistro.map((user) => (
                  <tr key={user.id}>
                    {/* <td>{user.id}</td> */}
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.is_superuser === true ? "Si" : "No"}</td>
                    <td>
                      <Button className="btn btn-primary btn-sm" style={{borderRadius : "5px", boxShadow : "none"}} onClick={(e) => rellenarForm(user)}><FontAwesomeIcon icon={faEdit}/></Button>
                      <Button className="btn btn-danger btn-sm" style={{borderRadius : "5px", boxShadow : "none"}} onClick={() => handleShow(user)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
        <div style={{position: "absolute", right: "0", top : "0"}}>
            <Link to="/home"><button style={{padding: "15px 40px", fontSize : "16px",borderRadius: "30px",border: "1px solid #000",background: "#dadada",cursor: "pointer",margin: "0 20px 0 20px"}}>
                Home
            </button></Link>
        </div>
        <div className={StyleLogin.container}>
          <h2 className={StyleLogin.title}>Registro</h2>
          <Form className="form" onSubmit={(e) => submitForm(e)}>
            <FormGroup>
              <Input
                style={inputStyle}
                type="text"
                name="username"
                id="username"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                style={inputStyle}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                valid={emailValidate === "has-success"}
                invalid={emailValidate === "has-danger"}
                value={email}
                onChange={(e) => {
                  validateEmail(e);
                  setEmail(e.target.value)
                }}
              />
              <FormFeedback>
                Escribe el formato correcto de correo
              </FormFeedback>
              <FormFeedback valid>
                Formato de correo correcto
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Input
                style={inputStyle}
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                style={inputStyle}
                type="password"
                name="password2"
                id="password2"
                placeholder="Confirmar Contraseña"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </FormGroup>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret color="custom" style={{background:"#0b0b13e6", color: "white" , borderRadius: '100px', boxShadow: 'none' }} size="md" block children={isGerente === true ? "Gerente" : (isGerente === false ? "Cajero" : "Seleccione tipo usuario")}>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Tipo Usuario</DropdownItem>
                <DropdownItem name="is_gerente" onClick={(e) => setIsGerente(true)}>Gerente</DropdownItem>
                <DropdownItem divider />
                <DropdownItem name="is_gerente" onClick={(e) => setIsGerente(false)}>Cajero</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button type="submit" onClick={() => consumir_register()} style={{ borderRadius: '100px', boxShadow: 'none' , width:"100%"}} block>Registrar</Button>
            <Button type="submit" id='cancelar' onClick={() => limpiarForm()} style={{ borderRadius: '100px', boxShadow: 'none' , width:"100%"}} block>Cancelar</Button>
          </Form>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>¿Seguro que quiere eliminar este usuario?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
              <Button className="btn btn-secondary" style={{ borderRadius: '100px', boxShadow: 'none', paddingLeft: '10%', paddingRight: '10%' }} onClick={handleClose}>Cancelar</Button>
              <Button className="btn btn-primary" style={{ borderRadius: '100px', boxShadow: 'none', paddingLeft: '10%', paddingRight: '10%' }} onClick={() => peticionDelete({ idRegistro })}>Confirmar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
