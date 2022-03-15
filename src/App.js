// import logo from './logo.svg';
// import './App.css';
import Login from './components/UsuarioLogin/Login';
import Menu from './components/Menu/Menu';
import Register from './components/UsuarioRegistro/Register';
import FlujoEfectivo from './components/FlujoEfectivo/FlujoEfectivo';
import Categorias from './components/Categorias/Categorias';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Menu />}/>
                <Route path='/registro' element={<Register />} />
                <Route path='/flujo' element={<FlujoEfectivo />} />
                <Route path='/categorias' element={<Categorias />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
