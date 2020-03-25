import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import fire from '../config/fire';

import AppBar from '@material-ui/core/AppBar';


export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }



  logout(e) {
    fire.auth().signOut();
  }


  render() {

    return (

      <AppBar position="static">
        <Router>
          <nav className="navbar text-white navbar-expand-sm navbar-dark w-100 justify-content-between">
            <span>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link font-weight-bold">Digital Menu</Link>
                </li>
                <li className="nav-item">
                  <Link to="/how_it_works" className="nav-link text-capitalize">Add Food Type</Link>
                </li>
                <li className="nav-item">
                  <Link to="/post" className="nav-link">About Us</Link>
                </li>
              </ul>
            </span>
            <span>
              <ul className="navbar-nav">
                <li className="nav-item" >
                {this.user_login?<Link to="/login" className="nav-link font-weight-bold text-capitalize" onClick={this.logout}>Logout</Link>:
                  <Link to="/login" className="nav-link font-weight-bold text-capitalize" >Login</Link>}
                </li>
                <li className="nav-item" >
                  <Link to="/signup" className="nav-link font-weight-bold">Sign Up</Link>
                </li>
              </ul>
            </span>
          </nav>
        </Router>
      </AppBar>




    )
  }
}
