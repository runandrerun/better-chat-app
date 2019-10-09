import React, { Component } from 'react';
import UsersContainer from './UsersContainer';
import PostsContainer from './PostsContainer';
import Profile from '../components/Profile';
import Login from '../components/Login';
import ChatInput from '../components/ChatInput';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchUsers, fetchPosts, createPost } from '../adapters/index.js';
import '../styles/chat-container.css';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  })
);
class ChatContainer extends Component {

  state = {
      user: null,
      posts: null,
      loggedIn: null,
    };

  componentDidMount() {
    return fetchPosts()
      .then(posts => {
        if (posts === undefined) {
          return null;
        } else {
          return this.setState({ posts })
        }
      })
      .catch(err => console.log(err));
  }

  handlePostSubmit = (post) => {

    this.setState({
      posts: [ ...this.state.posts, post ]
    })
  };

  handleLogout = () => {
    this.setState({
      loggedIn: false
    });
  };

  render() {
    if (!sessionStorage.getItem("id")) {
      return <Login />
    } else {
      return (
        <div id="chat-container">
          <Grid style={{height:"400px"}} container direction="row" justify="center" alignItems="center" spacing={2} alignItems="stretch">
            <Grid item md={4}>
              <Profile user={JSON.parse(sessionStorage.getItem("user"))} handleLogout={this.handleLogout}/>
            </Grid>
            <Grid item md={7}>
              <div className="chat-section">
              {/*<UsersContainer users={this.props.users} />*/}
                <PostsContainer posts={this.state.posts} users={this.props.users}/>
                <ChatInput posts={this.state.posts} handlePostSubmit={this.handlePostSubmit} />
              </div>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}

export default ChatContainer;
