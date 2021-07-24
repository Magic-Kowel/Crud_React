import React from 'react';
class Editar extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            datosCargados:false,
            empleado:[]
        }
    }
    componentDidMount(){
        console.log(this.props.match.params.id);
        fetch("http://localhost/crud-react/api/?consultar="+this.props.match.params.id)
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
        return ( 
            <div className="card">
                <div className="card-header">
                    Editar Empleados
                </div>
                <div className="card-body">
                    {empleado.id}
                    {empleado.nombre}
                    {empleado.correo}
                </div>
                <div className="card-footer text-muted">
                    Footer
                </div>
            </div> 
        );
    }
}
export default Editar;