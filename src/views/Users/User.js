import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import API from '../../api';

// import usersData from './UsersData'

class User extends Component {

  constructor(props){
    super(props);
    this.state = {
      usuario: null
    }
  }

  getUser = () => {
    API.get("usuarios/" + this.props.match.params.id).then(response => {
      this.setState({usuario: response.data});
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
    this.getUser();
  }

  render() {

    //const user = this.state.usuarios.find( user => user.id.toString() === this.props.match.params.id );

    //const user = usersData.find( user => user.id.toString() === this.props.match.params.id)

    const userDetails = this.state.usuario ? Object.entries(this.state.usuario) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      {
                        userDetails.map(([key, value]) => {
                          return (
                            <tr key={key}>
                              <td style={{textTransform: 'capitalize'}}><strong>{`${key}:`}</strong></td>
                              <td>{value}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
