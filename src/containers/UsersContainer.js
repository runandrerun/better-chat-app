import React, { Component } from 'react';

class UsersContainer extends Component {

  createUsersBoard = () => {
    if (this.props.users != null) {
      return this.props.users.map(user => {
        console.log("Inside Create", user.real_name);
        return <p key={user.id} className="App-intro">{user.real_name}</p>;
      });
    };
  }

  render() {
    console.log(this.state);
    return (
      <div>
         {/*  {this.props.users ? this.createUsersBoard() : null} */}
      </div>
    );
  }
}

export default UsersContainer;
