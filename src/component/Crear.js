import React from 'react';
import Swal from 'sweetalert2'
import api from '../services/api';
import { Link } from 'react-router-dom';
class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre:"",
            correo:"",
            errores:[]
        }
    }
    cambioValor = (e)=>{
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({state,errores:[]});
    }
    verificarError(elemento){
        return this.state.errores.indexOf(elemento) !==-1;
    }
    enviarDatos = (e)=>{
        e.preventDefault();
        console.log("Formulario enviado...");
        const {nombre,correo} = this.state;
        console.log(nombre);
        console.log(correo);

        let errores=[];
        if(!nombre){
            errores.push("error_nombre");
        }
        if(!correo){
            errores.push("error_correo");
        }
        this.setState({errores:errores});
        if(errores.length>0) return false;

        let datosEnviar ={
            nombre:nombre,
            correo:correo
        };
        fetch(api+"?insertar=1",{
            method:"POST",
            body:JSON.stringify(datosEnviar)
        })
        .then(respuesta =>respuesta.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            Swal.fire({
                title: 'Usuari agregado',
                text: 'se añadio usuario',
                icon: 'success',
                confirmButtonText: 'ok',
                timer: 3000
            }).then(()=>{
                this.props.history.push("/");
            })
        })
        .catch(error=>{
            console.log(error);
        });
    }
    render() { 
        const {nombre,correo} = this.state;
        return ( 
            <div className="card">
                <div className="card-header">
                    Empleados
                </div>
                <div className="card-body">
                    <form className="needs-validation"
                        onSubmit={this.enviarDatos}
                    >
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">
                                Nombre
                            </label>
                            <input 
                            type="text"
                            value={nombre}
                            name="nombre"
                            onChange={this.cambioValor}
                            className={(
                                (this.verificarError("error_nombre"))?"is-invalid":"")+" form-control"
                            }
                            id="nombre"
                            aria-describedby="nombrePrepend"
                            ria-describedby="validarNombre"
                            
                            />
                            <div class="invalid-tooltip">
                                Rellene Nombre
                            </div>
                            <div id="nombre" className=" form-text">Escribe el nombre del empleado</div>
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">
                                Correo
                            </label>
                            <input 
                                type="email"
                                value={correo}
                                name="correo"
                                onChange={this.cambioValor}
                                className={(
                                    (this.verificarError("error_correo"))?"is-invalid":"")+" form-control"
                                }
                                id="Correo"
                                aria-describedby="CorreoHelp"
                                
                            />
                            <div id="CorreoHelp" className="form-text">Escribe el Correo del empleado</div>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="submit" className="btn btn-success">
                                Agregar
                            </button>
                            <Link
                                className="btn btn-danger"
                                to={"/"}
                            >
                                Canselar
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-muted">
                    
                </div>
            </div>
        );
    }
}
export default Crear ;