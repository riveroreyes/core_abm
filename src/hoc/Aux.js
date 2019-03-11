import React from 'react';

const Aux = (props) => {
    return(
        <div className="row" >
            <div className="col-12 col-sm-10 col-md-10 col-lg-10">
                {props.children}
            </div>
        </div>
    )
}

export default Aux;