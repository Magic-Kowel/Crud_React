import React from 'react';
import Swal from 'sweetalert2'
import api from '../services/api';
import { Link } from 'react-router-dom';
class Editar extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            datosCargados:false,
            empleado:[]
        }
    }
    cambioValor = (e)=>{
        const state = this.state.empleado;
        state[e.target.name] = e.target.value;
        this.setState({empleado:state});
    }
    enviarDatos = (e)=>{
        e.preventDefault();
        console.log("Formulario enviado...");
        const{id,nombre,correo} = this.state.empleado;
        console.log(id+' '+nombre+' '+correo);
        let datosEnviar ={
            id:id,
            nombre:nombre,
            correo:correo
        };
        fetch(api+"?actualizar=1",{
            method:"POST",
            body:JSON.stringify(datosEnviar)
        })
        .then(respuesta =>respuesta.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            Swal.fire({
                title: 'Usuari Editado',
                text: 'se edito usuario',
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
    componentDidMount(){
        console.log(this.props.match.params.id);
        fetch(api+"?consultar="+this.props.match.params.id)
        .then(respuesta =>respuesta.json())
        .then((datosRespuesta)=>{
            console.log("=>"+datosRespuesta);
            this.setState({
                datosCargados:true,
                empleado:datosRespuesta[0]
            })
        })
        .catch(error=>{
            console.log(error);
        });
    }
    render() { 
        const {datosCargados, empleado} = this.state;
        if(!datosCargados){
            return(
                <div>Cargando...</div>
            );
        }else{
            return ( 
                <div className="card">
                    <div className="card-header">
                        Editar Empleados
                    </div>
                    <div className="card-body">
                        <form 
                            onSubmit={this.enviarDatos}
                        >
                        <div className="mb-3">
                                <label htmlFor="" className="form-label">
                                    Clave:{empleado.id}
                                </label>
                                <input 
                                type="text"
                                readOnly
                                value={empleado.id}
                                name="id"
                                onChange={this.cambioValor}
                                className="form-control"
                                id="id"
                                aria-describedby="helpId"
                                />
                                <div id="helpId" className="form-text">Escribe el nombre del empleado</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">
                                    Nombre
                                </label>
                                <input 
                                type="text"
                                value={empleado.nombre}
                                name="nombre"
                                onChange={this.cambioValor}
                                className="form-control"
                                id="nombre"
                                aria-describedby="nombreHelp"
                                />
                                <div id="nombreHelp" className="form-text">Escribe el nombre del empleado</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">
                                    Correo
                                </label>
                                <input 
                                    type="email"
                                    value={empleado.correo}
                                    name="correo"
                                    onChange={this.cambioValor}
                                    className="form-control"
                                    id="Correo"
                                    aria-describedby="CorreoHelp"
                                />
                                <div id="CorreoHelp" className="form-text">Escribe el Correo del empleado</div>
                            </div>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="submit" className="btn btn-success">
                                    Editar
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
}
export default Editar;