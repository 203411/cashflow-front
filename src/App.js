// import logo from './logo.svg';
// import './App.css';
import Login from './components/UsuarioLogin/Login';
import Menu from './components/Menu/Menu';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Menu/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
