import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import fire from "../config/fire";

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      r_name: "",
      r_address: "",
      r_phone: "",
      r_c_p_name: "",
      r_c_p_phone: "",
      f_type: "",
    };
  }

  // UNSAFE_componentWillReceiveProps(props) {
  //   if (props.data)
  //     this.setState({
  //       user: props.user,
  //       data: props.data,
  //       r_name: props.data.restaurant_name,
  //       r_address: props.data.restaurant_address,
  //       r_phone: props.data.restaurant_phone,
  //       r_c_p_name: props.data.contact_person_name,
  //       r_c_p_phone: props.data.contact_person_phone,
  //       f_type: props.data.food_type,
  //     });
  // }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  update = () => {
    fire
      .database()
      .ref("restaurant/" + this.props.user.uid)
      .update({
        restaurant_name: this.state.r_name || this.props.data.restaurant_name,
        restaurant_address:
          this.state.r_address || this.props.data.restaurant_address,
        restaurant_phone:
          this.state.r_phone || this.props.data.restaurant_phone,
        contact_person_name:
          this.state.r_c_p_name || this.props.data.contact_person_name,
        contact_person_phone:
          this.state.r_c_p_phone || this.props.data.contact_person_phone,
        food_type: this.state.f_type || this.props.data.food_type,
        last_updated: new Date().toUTCString(),
      })
      .then(() => {
        alert("Update Complete");
      });
  };

  render() {
    var { user, data } = this.props;

    return (
      <div>
        {user && user.uid && data ? (
          <div className="restaurant-form">
            <div className="w-50">
              <p>Last updated : {data.last_updated}</p>
              {/* <div class="form-group">
                <label for="r_id">Restaurant Id:</label>
                <input
                  type="text"
                  class="form-control"
                  id="r_id"
                  disabled
                  value={user.uid}
                />
              </div> */}

              <div class="form-group">
                <label for="r_name">
                  Restaurant Name:<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="r_name"
                  required
                  defaultValue={data.restaurant_name}
                  onChange={this.handleChange}
                />
              </div>

              <div class="form-group">
                <label for="r_address">
                  Restaurant Address:<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="r_address"
                  required
                  defaultValue={data.restaurant_address}
                  onChange={this.handleChange}
                />
              </div>

              <div class="form-group">
                <label for="r_phone">
                  Restaurant Phone:<span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  class="form-control"
                  id="r_phone"
                  required
                  defaultValue={data.restaurant_phone}
                  onChange={this.handleChange}
                />
              </div>

              <div class="form-group">
                <label for="r_c_p_name">
                  Restaurant Contact Person Name:
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="r_c_p_name"
                  required
                  defaultValue={data.contact_person_name}
                  onChange={this.handleChange}
                />
              </div>

              <div class="form-group">
                <label for="r_c_p_phone">
                  Restaurant Contact Person Phone:
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  class="form-control"
                  id="r_c_p_phone"
                  required
                  defaultValue={data.contact_person_phone}
                  onChange={this.handleChange}
                />
              </div>

              <div class="form-group">
                <label for="f_type">
                  Food types which you serve:
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  class="form-control"
                  id="f_type"
                  required
                  defaultValue={data.food_type}
                  onChange={this.handleChange}
                />
              </div>

              <button
                class="btn btn-outline-warning"
                type="submit"
                onClick={this.update}
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div className="loading">
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
          </div>
        )}
      </div>
    );
  }
}
