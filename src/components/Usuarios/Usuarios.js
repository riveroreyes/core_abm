import React, { Component } from "react";
import classes from "./Usuarios.module.css";
import MyForm from "../MyForm/MyForm";
// import MyList from "../MyList/MyList";
import Aux from "../../hoc/Aux";

class Usuarios extends Component {

  render() {
    // let usuarios = this.props.usuarios;
    let btnTextGuardar = this.props.index >= 0 ? "Actualizar" : "Guardar";

    return (
      <Aux>
        <div className={classes.Usuarios}>
          <h1>{this.props.title}</h1>

          <MyForm
            textoGuardar={btnTextGuardar}
            guardar={this.props.handleGuardar}
            change={this.props.handleChange}
            form={this.props.form}
          />

        </div>
      </Aux>
    );
  }
}

export default Usuarios;
