import { Component } from 'react';
import { Form, FormFeedback, FormGroup,  Input, Button,  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StyleLogin from '../UsuarioRegistro/Login.module.css';
import './Register.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import MenuCss from '../Menu/Menu.module.css'
class Register extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          data:[],
          usuario:{
            username: '',
            password: '',
            password2: '',
            email: '',
            is_gerente: null,
            validate: {
                emailState: '',
                dropdownOpen: false,
            },
          }
            
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    handleChange= async e=>{
      e.persist();
      await this.setState({
        usuario:{
          ...this.state.usuario,
          [e.target.name]: e.target.value
        }
      });
      console.log(this.state.form);
      }

    validateEmail(e) {
        const emailRex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const { validate } = this.state.usuario;

        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success';
        } else {
            validate.emailState = 'has-danger';
        }

        this.setState({ validate });
    }

    submitForm(e) {
        e.preventDefault();
        console.log(`Email: ${this.state.email}`);
    }

    seleccionarUsuario=(user)=>{
      this.setState({
        
        usuario: {
          id: user.id,
          username: user.username,
          password: user.password,
          password2: user.password2,
          email:user.email,
          is_gerente: user.is_superuser,
        }
      })
    }
    consumir_register = () => {
      var postData = {
          username:this.state.usuario.username,
          password: this.state.usuario.password,
          password2: this.state.usuario.password2,
          email: this.state.usuario.email,
          is_superuser:this.state.usuario.is_gerente
      }
      axios
          .post("http://localhost:8000/cash_flow/registro/lista/", postData, {
              Headers: { 'Content-Type': 'application/json', }
          })
          .then((response) => {
            alert("usuario registrado correctamente");
            window.location = "/registro";
          })
          .catch((error) => {
            alert("usuario no registrado!");
          })
      }
      peticionDelete=()=>{
        axios.delete("http://localhost:8000/cash_flow/registro/user/"+this.state.usuario.id).then(response=>{
          this.setState({modalEliminar: false});
          this.peticionGet();
        })
      }
      peticionGet=()=>{
        axios.get("http://localhost:8000/cash_flow/registro/lista/").then(response=>{
          this.setState({data: response.data});
          console.log(this.state.data);
        }).catch(error=>{
          console.log(error.message);
        })
        }
        componentDidMount() {
          this.peticionGet();
        }

    render() {
        const { usuario } = this.state.usuario;
        const inputStyle = {
            borderRadius: '100px',
            padding: '18px 52px'
        };

        return (
            <div className={StyleLogin.body}>
              <br/><br/><br/>
                <div className={StyleLogin.background}>
                <h2 className={StyleLogin.title}>Crud usuario</h2>
                <br/><br/><br/>
                <Table size="sm">
                <thead>
                <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>es Gerente?</th>
                <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
            {this.state.data.map(user=>{
          return(
          <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.is_superuser===true ? "SI" : "No"}</td>
          <td>
                <button  className="btn btn-primary btn-sm" ><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger btn-sm" ><FontAwesomeIcon icon={faTrashAlt}/></button>
          </td>
          </tr>
          )
        })}
      </tbody>
            </Table>
                </div>
                <Link to="home" className={MenuCss.link}>Home</Link>
                <div className={StyleLogin.container}>
                <h2 className={StyleLogin.title}>Registro</h2>
                    <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                        <FormGroup>
                            <Input
                                style={inputStyle}
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Usuario"
                                value={usuario?usuario.username:''}
                                onChange={(e) => this.handleChange(e)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                style={inputStyle}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                valid={this.state.usuario.validate.emailState === "has-success"}
                                invalid={this.state.usuario.validate.emailState === "has-danger"}
                                value={usuario?usuario.email:''}
                                onChange={(e) => {
                                    this.validateEmail(e);
                                    this.handleChange(e);
                                }}
                            />
                            <FormFeedback>
                                Escribe el formato correcto de correo
                            </FormFeedback>
                            <FormFeedback valid>
                                Formato de correo, correcto
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Input
                                style={inputStyle}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Contraseña"
                                value={usuario?usuario.password:''}
                                onChange={(e) => this.handleChange(e)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                style={inputStyle}
                                type="password"
                                name="password2"
                                id="password2"
                                placeholder="Confirmar Contraseña"
                                value={usuario?usuario.password2:''}
                                onChange={(e) => this.handleChange(e)}
                            />
                        </FormGroup>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret color="info" style={{ borderRadius: '100px', boxShadow : 'none'}} size="md" block children={this.state.is_gerente != null ? (this.state.is_gerente === "true" ? "Gerente": "Cajero") : "Seleccione tipo usuario" }>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Tipo Usuario</DropdownItem>
                                <DropdownItem name="is_gerente" onClick={(e) => this.handleChange(e)} value={true}>Gerente</DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem name="is_gerente" onClick={(e) => this.handleChange(e)} value={false}>Cajero</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button type="submit" onClick={()=>this.consumir_register()} style={{ borderRadius: '100px', boxShadow : 'none'}} size="md" block>Registrar</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Register;