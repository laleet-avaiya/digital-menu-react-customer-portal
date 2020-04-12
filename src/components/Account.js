import React, { Component } from "react";

export default class Account extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    var { user, data } = this.props;

    return (
      <div>
        {user && user.uid && data ? (
          <p>
            {user.uid}
            {data.restaurant_name}
          </p>
        ) : (
          <p>Guest</p>
        )}
      </div>
    );
  }
}
