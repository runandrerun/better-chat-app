import React, { Component } from 'react';
import ChatContainer from '../containers/ChatContainer';
import { fetchUsers } from '../adapters/';
import { Button, TextField } from '@material-ui/core';
import '../styles/login.css';

class Login extends Component {
  state = {
    username: '',
    user: {},
    users: null,
    userExists: '',
  }

  componentDidMount() {
    fetchUsers()
      .then(res => this.setState({ users: res.users }))
      .catch(err => console.log(err));
  }

  validateForm = () => {
    return this.state.username.length > 0;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    return this.state.users.find(user => {
      if (this.state.username.toLowerCase() === user.username.toLowerCase()) {
        this.setState({
          user: user
        })
        sessionStorage.setItem('id', user.id);
        sessionStorage.setItem('user', JSON.stringify(user));
      }
      return this.setState({
        userExists: 'This user does not exist'
      })
    })
  };

  userError = () => {
    return "This user does not exist";
  }

  render() {

    if (sessionStorage.getItem('id')) {
      return <ChatContainer user={this.state.user} users={this.state.users} />;
    } else {
      return (
        <div className="Login">
          <h1>Welcome!</h1>
          <form onSubmit={this.handleSubmit}>
            <TextField
              className="username-field"
              label="Username"
              variant="outlined"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <div className="user-error">{this.state.userExists}</div>
            <Button
              className="login-btn"
              type="submit"
              disabled={!this.validateForm()}
              variant="contained"
            >
              Login
            </Button>
          </form>
        </div>
      );
    };
  };
};

export default Login;
