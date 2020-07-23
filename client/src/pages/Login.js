import React, { Component } from 'react';
import { Section, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import API from '../utils/API';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    API.Login(this.state)
      .then((res) => {
        console.log(res.data._id);
        localStorage.setItem('user', res.data._id);
        this.props.updateUser(res.data._id);

        window.location = '/';
      });
  };

  render() {
    return (
      <Container>
        <Section>
          <form>
            <Input
              name='username'
              onChange={this.handleInputChange}
              value={this.state.username}
              label="Username"
            />

            <Input
              name='email'
              onChange={this.handleInputChange}
              value={this.state.email}
              label="Email"
            />

            <FormBtn
              onClick={this.handleSubmit}
            >
              Login
            </FormBtn>
          </form>
        </Section>
      </Container>
    );
  }
}

export default Login;

