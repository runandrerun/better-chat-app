import React from 'react';
import logo from './logo.svg';
import BetterIcon from './better-icon-login.svg';
import './App.css';
import ChatContainer from './containers/ChatContainer';
import Login from './components/Login';
import { Router, Switch, Route, Link, withRouter } from "react-router-dom";


function App() {
  return (
      <div className="App">
        <header className="App-header">
          <img src={BetterIcon} className="App-logo" alt="logo" />
        </header>
        <Switch>
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/chat" render={() => <ChatContainer/>} />
          <Route exact path="/" render={() => <Login />} />
        </Switch>
      </div>
  );
}

export default withRouter(App);
