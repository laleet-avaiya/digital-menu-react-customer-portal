import React, { Component } from "react";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row nav navbar navbar-expand-sm bg-dark navbar-dark text-white justify-content-center">
        <h6>Digital Menu</h6>
      </div>
    );
  }
}
