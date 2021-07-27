import React from 'react';
class Spinner extends React.Component{
    render(){
        return(
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-info" style={{width: '15rem', height: '15rem'}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
}
export default Spinner;