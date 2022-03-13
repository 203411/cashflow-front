import { Component } from 'react';
import { Form,FormFeedback,   FormGroup,  FormText,  Label,  Input,  Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StyleLogin from '../UsuarioLogin/Login.module.css';
import './Register.css';
 
class Register extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      username: '',
      password: '',
      password2: '',
      email: '',
      is_gerente:'',
      validate: {
        emailState: '',
        dropdownOpen: false,
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
 
    this.setState({
      [name]: value,
    });
  };
 
  validateEmail(e) {
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 
    const { validate } = this.state;
 
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
 
  render() {
    const { username,password,password2,email,is_gerente} = this.state;
    const inputStyle = {
      borderRadius: '100px',
      padding: '18px 52px'
    };
 
    return (
      <div className={StyleLogin.body}>
                <div className={StyleLogin.background}>
                    <div className={StyleLogin.containerBackground}>
                        <p className={StyleLogin.title} id={StyleLogin.title}>CashFlow</p>
                        <p className={StyleLogin.subtitle} id={StyleLogin.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse.</p>
                    </div>
                    <div className={StyleLogin.circleBorder} id={StyleLogin.circleTop}></div>
                    <div className={StyleLogin.circleBorder} id={StyleLogin.circleBottom}></div>
                </div>
      
      <div  className={StyleLogin.container}>
        <h2 className={StyleLogin.title}>Registro de usuario</h2>
        <Form className="form" onSubmit={(e) => this.submitForm(e)}>
        <FormGroup>
            
            <Input
     
            style={inputStyle}
              type="text"
              name="username"
              id="username"
              placeholder="Usuario"
              value={username}
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
              valid={this.state.validate.emailState === "has-success"}
              invalid={this.state.validate.emailState === "has-danger"}
              value={email}
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
              value={password}
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
              value={password2}
              onChange={(e) => this.handleChange(e)}
            />
          </FormGroup>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}  >
        <DropdownToggle caret color="info" style={{borderRadius: '100px'}} size="md" block>
          Seleccione tipo usuario
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Tipo Usuario</DropdownItem>
          <DropdownItem>Gerente</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Cajero</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
          <Button style={{borderRadius: '100px'}} color="secondary" size="md" block>Registrar</Button>
        </Form>
      </div>
      </div>
    );
  }
}
 
export default Register;