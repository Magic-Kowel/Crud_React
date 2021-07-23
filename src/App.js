import './App.css';
import Listar from "./component/Listar";
import Crear from './component/Crear';
import Editar from './component/Editar';
import {
  Route,
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { create } from 'istanbul-reports';
function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="nav navbar-nav">
          <Link 
            className="nav-item nav-link active"
            to="/"
          >
            Systema
            <span className="sr-only">

            </span>
          </Link>
          <Link className="nav-item nav-link"
            to="/crear"
            >
            Crear Empleado
          </Link>
          <Link className="nav-item nav-link"
            to="/editar"
            >
            Editar Empleado
          </Link>
        </div>
      </nav>
      <div className="container">
        <Route 
          exact path="/"
          component={Listar}
        ></Route>
        <Route 
          path="/crear"
          component={Crear}
        ></Route>
        <Route 
          path="/editar"
          component={Editar}
        ></Route>
      </div>
    </Router>
  );
}

export default App;
