import React from 'react';
import Swal from 'sweetalert2'
import {Link} from "react-router-dom";
import api from '../services/api';
class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados:false,
            empleados:[]
        }
    }
    borrarRegistro = (id) =>{
        console.log(id);
        fetch(api+"?borrar="+id)
        .then(respuesta =>respuesta.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            this.cargarDatos();
        })
        .catch(error=>{
            console.log(error);
        });
    }
    cargarDatos(){
        fetch(api)
        .then(respuesta =>respuesta.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            this.setState({
                datosCargados:true,
                empleados:datosRespuesta
            })
        })
        .catch(error=>{
            console.log(error);
        });
    }
    componentDidMount(){
        this.cargarDatos();
    }
    render() { 
        const {datosCargados,empleados}= this.state;
        if(!datosCargados){
            return(
                <div>Cargando...</div>
            );
        }else{
        return (
            <>
            <div className="card">
                <div className="card-header">
                    <Link className="btn btn-success"
                        to={"/app/crear"}
                    >
                        Agregar Nevo Empleado
                    </Link>
                </div>
                <div className="card-body">
                    <h4>Listar empleados</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Aciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            empleados.map(
                                (empleado)=>(
                                <tr key={empleado.id}>
                                    <td>{empleado.id}</td>
                                    <td>{empleado.nombre}</td>
                                    <td>{empleado.correo}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="">
                                            <Link 
                                                to={"/app/editar/"+empleado.id}
                                                className="btn btn-warning"

                                            >
                                                Editar
                                            </Link>
                                            <button
                                                className="btn btn-danger"
                                                onClick={()=>{
                                                    this.borrarRegistro(empleado.id)
                                                }}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                )
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <div className="card-footer">
                    
                </div>
            </div>
            </>
            );
        }
    }
}

export default Listar;