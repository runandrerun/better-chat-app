import React, { Component } from 'react';
import { Card, CardHeader, CardContent, Avatar, Button } from '@material-ui/core';
import '../styles/profile-card.css';

class Profile extends Component {

  handleSignOff = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("id");
    this.props.handleLogout();
  }

  render() {
      return (
        <Card>
          <CardContent>
            <CardHeader
              avatar={
                <Avatar style={{width:60, height:60, margin: 10}} className="profile-avatar" src={require(`../img/${this.props.user.username}.jpg`)}></Avatar>
              }
              title={ this.props.user.username ? <p>{`@${this.props.user.username}`}</p> : null}
              subheader={ this.props.user.verified !== false ? <p>{"Your account is verified."}</p> : <p>{"Your account isn't verified"}</p>}
              />
                <Button variant="contained" color="secondary" onClick={this.handleSignOff}>Sign out</Button>
          </CardContent>
        </Card>
      );
  }
}

export default Profile;
