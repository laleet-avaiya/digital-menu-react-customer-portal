import React, { Component } from "react";
import fire from "../config/fire";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Account extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    var { user, data } = this.props;

    return <div>{user && user.uid ? <p>{user.uid}</p> : <p>Guest</p>}</div>;
  }
}
