import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import API from "../../api";

import usersData from "./UsersData";
import Clientes from "../../components/Clientes/Clientes";

function UserRow(props) {
  const user = props.user;
  const userLink = `/users/${user.id}`;

  const getBadge = status => {
    return status === "Active"
      ? "success"
      : status === "Inactive"
      ? "secondary"
      : status === "Pending"
      ? "warning"
      : status === "Banned"
      ? "danger"
      : "primary";
  };

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
      <td>{user.name}</td>
      <td>{user.lastname}</td>
    </tr>
  );
}

class Users extends Component {

  state = {
    clientes: []
  }

  componentWillMount() {
    this.obtenerListado();
  }

  obtenerListado = async () => {
    const resp = await API.get("clientes");

    if (resp.status === 200) {
      this.setState({ clientes: resp.data });
    }

  };

  render() {
    //const userList = usersData.filter(user => user.id < 10);

    return (
      <div className="animated fadeIn">
        <Clientes />
        <Row>
          <Col xl={6}>
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
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.clientes.map((user, index) => (
                      <UserRow key={index} user={user} />
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
