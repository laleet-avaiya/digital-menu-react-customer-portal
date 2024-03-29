import React, { Component } from "react";
import fire from "./config/fire";
import Home from "./components/Home";
import Signup from "./components/auth/signup";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/auth/Login";
import { Spinner } from "react-bootstrap";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      user_login: false,
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user, user_login: true });
      } else {
        this.setState({ user: false });
      }
    });
  }

  render() {
    var { user_login, user } = this.state;
    return (
      <Router>
        {user ? (
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route path="/" component={Home} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route path="/" component={Login} />
          </Switch>
        )}
      </Router>
    );
  }
}
