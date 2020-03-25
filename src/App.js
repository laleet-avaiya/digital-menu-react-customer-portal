import React, { Component } from 'react'
import fire from './config/fire';
import Home from './components/Home'
import Signup from './components/auth/signup';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/auth/Login';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      user_login: false
    }

    this.logout = this.logout.bind(this);

  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user, user_login: true });
      }
      else {
        this.setState({ user: false });
      }
    });
  }

  logout(e) {
    fire.auth().signOut().then(
      this.setState({
        user: null,
        user_login: false
      })
    );
  }

  render() {
    var { user_login,user } = this.state;
    return (
      <Router>
        {
          user ?
            <Route exact path="/" component={Home}/> :
            <Route exact path="/" component={Login} />
        }
        <Route exact path="/signup" component={Signup} />
        
      </Router>
    )
  }
}