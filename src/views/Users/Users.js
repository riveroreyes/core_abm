import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import classes from "./Users.module.css";
import API from "../../api";

// import usersData from "./UsersData";
import Usuarios from "../../components/Usuarios/Usuarios";

function UserRow(props) {
  const user = props.user;
  const userLink = `/users/${user.id}`;

  // const getBadge = status => {
  //   return status === "Active"
  //     ? "success"
  //     : status === "Inactive"
  //     ? "secondary"
  //     : status === "Pending"
  //     ? "warning"
  //     : status === "Banned"
  //     ? "danger"
  //     : "primary";
  // };

  // return (
  //   <tr key={user.id.toString()}>
  //     <th scope="row"><Link to={userLink}>{user.id}</Link></th>
  //     <td><Link to={userLink}>{user.name}</Link></td>
  //     <td>{user.registered}</td>
  //     <td>{user.role}</td>
  //     <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
  //   </tr>
  // )

  return (
    <tr key={user.id.toString()}>
      <th scope="row">{user.id}</th>
      <td><Link to={userLink}>{user.name}</Link></td>
      <td>{user.lastname}</td>
      <td>
        <button
          type="button"
          onClick={() => props.edit(user.id)}
          className={[classes.myListButton, classes.editar].join(" ")}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => props.delete(user.id, props.index)}
          className={[classes.myListButton, classes.borrar].join(" ")}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Alta de usuarios",
      usuarios: [],
      index: -1,
      id: 0,
      form: {
        name: {
          control: "input",
          tipo: "text",
          name: "name",
          placeholder: "Tu nombre",
          value: ""
        },
        lastname: {
          control: "input",
          tipo: "text",
          name: "lastname",
          placeholder: "Tu apellido",
          value: ""
        },
        activo: {
          control: "checkbox",
          tipo: "checkbox",
          name: "activo",
          placeholder: null,
          value: "1",
          checked: true
        }
      }
    };
  }

  obtenerListado = async () => {
    const resp = await API.get("usuarios");

    if (resp.status === 200) {
      this.setState({ usuarios: resp.data });
    }
  };

  resetForm = () => {
    const form = { ...this.state.form };
    Object.values(form).map((el, i) => (el.value = ""));

    this.setState({
      index: -1,
      id: 0,
      form: form
    });
  };

  updateUsuario = async usuario => {
    await API.put("usuarios/" + this.state.id, usuario);

    const usuarios = [...this.state.usuarios];
    usuarios[this.state.index].name = usuario.name;
    usuarios[this.state.index].lastname = usuario.lastname;

    this.resetForm();
  };

  insertUsuario = async usuario => {
    await API.post("usuarios/", usuario);

    this.obtenerListado();

    this.resetForm();
  };

  deleteUsuario = async (id, index) => {
    await API.delete("usuarios/" + id);

    let usuarios = [...this.state.usuarios];
    usuarios.splice(index, 1);

    this.setState({ usuarios: usuarios });

    this.resetForm();
  };

  componentDidMount() {
    this.obtenerListado();
  }

  handleChange = event => {
    const form = { ...this.state.form };

    form[event.target.name].value = event.target.value;

    this.setState({ form: form });
  };

  handleGuardar = () => {
    const usuario = {};

    Object.values(this.state.form).map(
      (el, i) => (usuario[el.name] = el.value)
    );

    if (this.state.index >= 0) {
      this.updateUsuario(usuario);
    } else {
      this.insertUsuario(usuario);
    }
  };

  handleDelete = (id, index) => {
    this.deleteUsuario(id, index);
  };

  handleEdit = id => {
    const index = this.state.usuarios.findIndex(el => el.id === id);

    const usuario = this.state.usuarios[index];

    const form = { ...this.state.form };

    Object.values(form).map(
      (el, i) => (form[el.name].value = usuario[el.name])
    );

    this.setState({
      form: form,
      index: index,
      id: id
    });
  };

  render() {
    //const userList = usersData.filter(user => user.id < 10);

    return (
      <div className="animated fadeIn">
        <Usuarios
          title={this.state.title}
          index={this.state.index}
          usuarios={this.state.usuarios}
          handleGuardar={this.handleGuardar}
          handleChange={this.handleChange}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          form={this.state.form}
        />

        <Row className={classes.Tabla}>
          <Col xl={{size:6, offset:2}}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Users{" "}
                <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">lastname</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.usuarios.map((user, index) => (
                      <UserRow
                        key={index}
                        index={index}
                        user={user}
                        edit={this.handleEdit}
                        delete={this.handleDelete}
                      />
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Users;
