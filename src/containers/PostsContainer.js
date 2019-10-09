import React, { Component } from 'react';
import PostCard from '../components/PostCard';
import '../styles/posts-container.css';

class PostsContainer extends Component {

  createPostsTimeline = () => {
    if (this.props.posts != null) {
      return this.props.posts.map(post => {
        return <PostCard key={post.id} post={post} users={this.props.users}/>
      })
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const out = document.getElementById("posts-container")
    setInterval(function() {
        const isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
        if (isScrolledToBottom) {
          out.scrollTop = out.scrollHeight - out.clientHeight;
        }
    }, 500)
  }

  render() {
    return (
      <div id="posts-container">
          {this.props.posts ? this.createPostsTimeline() : null}
      </div>
    );
  }
}

export default PostsContainer;
