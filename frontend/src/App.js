import logo from './logo.svg';
import './App.css';
import RegisterForm from './componentes/RegisterForm';
import ListaUsuarios from './componentes/ListaUsuarios';
import EditarUsuario from './componentes/EditarUsuario';

function App() {
  return (
    <div className ="App">
    <RegisterForm/>
    <ListaUsuarios/>
    <EditarUsuario/>
    </div>
  );
}

export default App;
