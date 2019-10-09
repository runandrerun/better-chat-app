import React, { Component } from 'react';
import { fetchUserById } from '../adapters';
import { Card, CardHeader, CardContent, Avatar, Paper } from '@material-ui/core';
import { Grid, Typography, ButtonBase } from '@material-ui/core';
import { postStyles } from '../styles/posts-styles-export.js';

export default class PostCard extends Component {
  createPost = () => {
    console.log(this.props)
    if (this.props.post != null) {
      if (this.props.post.user === parseInt(sessionStorage.getItem("id"))) {

        let moment = require('moment');
        let formattedTime = moment(this.props.post.ts).format('h:mma');

        return <div style={{flexGrow:1,padding:10}}>
                <ButtonBase onClick={e => this.createDetailCard(e, JSON.parse(sessionStorage.getItem("user")).username, this.props.post.id)}>
                  <Grid container spacing={1} style={{padding:10, margin:'auto',maxWidth:'500px'}}>
                    <Grid item xs={10} sm container>
                      <Grid item xs container direction="column" spacing={2} style={{width:"100%"}}>
                        <Grid item xs>
                          <Typography gutterBottom variant="body2">
                            {`${JSON.parse(sessionStorage.getItem("user")).real_name} – @${JSON.parse(sessionStorage.getItem("user")).username}`} {`– ${formattedTime}`}
                          </Typography>
                          <Paper id={`${JSON.parse(sessionStorage.getItem("user")).username}-${this.props.post.id}`} data-toggle="off" style={{margin:'auto',maxWidth:"100%",backgroundColor:"#16d1a5"}}>
                            <Typography id={`${JSON.parse(sessionStorage.getItem("user")).username}-${this.props.post.id}-msg`} variant="body2" style={{padding:15,maxWidth:"100%"}}>
                            {this.props.post.message ? this.props.post.message : null}
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}>
                          <Avatar alt="complex" src={require(`../img/${JSON.parse(sessionStorage.getItem("user")).username}.jpg`)} />
                      </Grid>
                    </Grid>
                  </Grid>
                </ButtonBase>
              </div>
      } else {
          let thisPostsUser = this.findUser(this.props.post.user);
          if (thisPostsUser) {
            let moment = require('moment');
            let formattedTime = moment(this.props.post.ts).format('h:mma');

            return <div style={{flexGrow:1, padding:10}}>
                    <ButtonBase onClick={e => this.createDetailCard(e, thisPostsUser.username, this.props.post.id)}>
                      <Grid container spacing={1} style={{padding:10,margin:'auto',maxWidth:'500px'}}>
                        <Grid item xs={2}>
                            <Avatar alt="complex" src={require(`../img/${thisPostsUser.username}.jpg`)} />
                        </Grid>
                        <Grid item xs={10} sm container style={{width:"100%"}}>
                          <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                              <Typography gutterBottom variant="body2">
                                {`${thisPostsUser.real_name} – @${thisPostsUser.username}`} {`– ${formattedTime}`}
                              </Typography>
                              <Paper id={`${thisPostsUser.username}-${this.props.post.id}`} data-toggle="off" style={{margin:'auto',maxWidth:'100%',}}>
                                <Typography id={`${thisPostsUser.username}-${this.props.post.id}-msg`} variant="body2" style={{padding:15,maxWidth:"100%"}}>
                                  {this.props.post.message ? this.props.post.message : null}
                                </Typography>
                              </Paper>
                            </Grid>
                          </Grid>

                        </Grid>
                      </Grid>
                    </ButtonBase>
                  </div>
        };
      };
    };
  };

  createDetailCard = (e, user, postId) => {
    e.preventDefault();
    console.log(user);
    let userWrap = document.getElementById(`${user}-${postId}`);
    let userMsg = document.getElementById(`${user}-${postId}-msg`);
    // let time = new Date(this.props.post.ts).getTime();
    // let date = new Date(time);
    // let startDate = date.toString();
    let moment = require('moment');
    let startDate = moment(this.props.post.ts).format("MMM Do YY");

    if (user === JSON.parse(sessionStorage.getItem("user")).username && userWrap.dataset.toggle === "off") {
      userWrap.style = "padding:10!important;margin:20;max-width:100%;width:100%!important;background-color:#291743;color:#ffffff;"
      userWrap.dataset.toggle = "on";
      userMsg.innerHTML = `<i style="font-size:14px;" class="material-icons">calendar_today</i> active since ${startDate}`;
    } else if (user === JSON.parse(sessionStorage.getItem("user")).username && userWrap.dataset.toggle === "on") {
      userWrap.style = "padding:10!important;margin:20;max-width:100%;width:100%!important;background-color:#16d1a5;";
      userWrap.dataset.toggle = "off";
      userMsg.innerHTML = `${this.props.post.message}`;
    } else if (userWrap.dataset.toggle === "off") {
      userWrap.style = "padding:10!important;margin:20;max-width:100%;background-color:#291743;color:#ffffff;"
      userWrap.dataset.toggle = "on";
      userMsg.innerHTML = `<i style="font-size:14px;" class="material-icons">calendar_today</i> active since ${startDate}`;
    } else if (userWrap.dataset.toggle === "on") {
      userWrap.style = "padding:10!important;margin:20;max-width:100%;background-color:#ffffff;"
      userWrap.dataset.toggle = "off";
      userMsg.innerHTML = `${this.props.post.message}`;
    }
  };

  findUser = (postUser) => {
    console.log("Inside findUser", postUser)
    if (this.props.users !== null) {
      return this.props.users.find(user => {
        if (postUser === user.id) {
          return user;
        }
      })
    };
  };

  render() {
    return (
      <>
        {this.props.post.ts ? this.createPost() : null}
      </>
    )
  }
}
