import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

export default class ChatInput extends Component {

  state = {
    message: '',
  }

  validateForm = () => {
    return this.state.message.length > 0;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      message: this.state.message,
      user: JSON.parse(sessionStorage.getItem("user")).id,
      ts: Math.floor(Date.now() / 1000),
      id: this.state.message.length,
    };

    this.props.handlePostSubmit(newPost);
    this.setState({ message: '' });
  };



  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <TextField
          onChange={this.handleChange}
         id="message"
         label="Better Chatbox"
         style={{ margin: 8, borderColor: '#fff' }}
         placeholder="What are you thinking?"
         helperText="Write above, and hit enter!"
         fullWidth
         value={this.state.message}
         margin="normal"
         InputLabelProps={{
           shrink: true,
         }}
       />
       <button
         className="login-btn"
         disabled={!this.validateForm()}
         type="submit"
        >
        Submit
        </button>
      </form>
    )
  }
}
