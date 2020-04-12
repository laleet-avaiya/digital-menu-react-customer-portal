import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import fire from "../config/fire";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      user_login: false,
    };
  }

  logout(e) {
    fire.auth().signOut();
  }

  render() {
    return (
      <div
        className="col-1 flex-fill justify-content-center pr-0 bg-dark"
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        <Link to="/food" className="btn w-100 mt-5 text-white">
          <i className="fa fa-heart"></i>
          <p>Food</p>
        </Link>

        <Link to="/menu" className="btn w-100 text-white">
          <i className="fa fa-book"></i>
          <p>Menu</p>
        </Link>

        <Link to="/qr_code" className="btn w-100 text-white">
          <i className="fa fa-qrcode"></i>
          <p>QR Code</p>
        </Link>

        <Link to="/account" className="btn w-100 text-white">
          <i className="fa fa-user"></i>
          <p>Account</p>
        </Link>

        <span onClick={this.logout} className="btn w-100  text-white">
          <i className="fa fa-sign-out-alt"></i>
          <p>Logout</p>
        </span>
      </div>
    );
  }
}
