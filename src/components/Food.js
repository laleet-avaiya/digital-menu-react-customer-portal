import React, { Component } from "react";
import fire from "../config/fire";
import { Alert, Card } from "react-bootstrap";

export default class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      data: props.data,
      foodType: "",
      foodTypeOption: "",
      foodName: "",
      foodPrice: "",
      veg: true,
      non_veg: false,
      pure_jain: false,
    };

    this.insertFoodType = this.insertFoodType.bind(this);
    this.deleteFoodType = this.deleteFoodType.bind(this);
    this.updateFoodName = this.updateFoodName.bind(this);
    this.updateFoodPrice = this.updateFoodPrice.bind(this);
    this.updateNonVeg = this.updateNonVeg.bind(this);
    this.updatePureVeg = this.updatePureVeg.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ user: props.user, data: props.data });
  }

  updateFoodType(e) {
    this.setState({
      foodType: e.target.value,
    });
  }
  updateFoodName(e) {
    this.setState({
      foodName: e.target.value,
    });
  }

  updateFoodPrice(e) {
    this.setState({
      foodPrice: e.target.value,
    });
  }

  deleteFoodType(index) {
    fire
      .database()
      .ref("restaurant/" + this.state.user.uid + "/menu/" + index)
      .remove();
  }

  insertFoodType() {
    if (this.state.foodType) {
      var length = this.state.data.menu ? this.state.data.menu.length : 0;
      fire
        .database()
        .ref("restaurant/" + this.state.user.uid + "/menu/" + length)
        .set({ type: this.state.foodType })
        .then(() =>
          this.setState({
            foodType: "",
            itemName: "",
          })
        );
    }
  }

  insertFoodItem() {
    if (
      this.state.foodName &&
      this.state.foodPrice &&
      this.state.foodTypeOption
    ) {
      var length = this.state.data.menu[this.state.foodTypeOption].items
        ? this.state.data.menu[this.state.foodTypeOption].items.length
        : 0;
      var url =
        "restaurant/" +
        this.state.user.uid +
        "/menu/" +
        this.state.foodTypeOption +
        "/items/" +
        length;
      fire
        .database()
        .ref(url)
        .set({
          itemName: this.state.foodName,
          price: this.state.foodPrice,
          veg: this.state.veg,
          non_veg: this.state.non_veg,
          pure_jain: this.state.pure_jain,
        })
        .then(() => {
          this.setState({
            foodName: "",
            foodPrice: " ",
            veg: true,
            non_veg: false,
            pure_jain: false,
          });
        });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateNonVeg() {
    if (this.state.non_veg)
      this.setState({ non_veg: !this.state.non_veg, veg: true });
    else this.setState({ pure_jain: false, veg: false, non_veg: true });
  }
  updatePureVeg() {
    if (this.state.pure_jain)
      this.setState({ pure_jain: !this.state.pure_jain });
    else
      this.setState({
        pure_jain: !this.state.pure_jain,
        veg: true,
        non_veg: false,
      });
  }

  render() {
    var { user, data, non_veg, pure_jain } = this.state;

    return (
      <div>
        {data ? (
          <div className="row mx-1">
            <div className="form-group">
              <label style={{ fontWeight: "bold", fontFamily: "arial" }}>
                Food Types
              </label>
            </div>
            <p className="table table-bordered w-100">
              {data.menu
                ? data.menu.map((item, index) => {
                    return (
                      <p
                        className="btn btn-light text-capitalize m-1"
                        style={{
                          backgroundColor: "#ffffff",
                          fontWeight: "bold",
                        }}
                        key={index}
                      >
                        {item.type}
                        <span
                          className="badge badge-danger ml-1"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this item?"
                              )
                            )
                              this.deleteFoodType(index);
                          }}
                        >
                          X
                        </span>
                      </p>
                    );
                  })
                : null}
            </p>
          </div>
        ) : null}
        {data ? (
          <div className="row px-4 mt-3">
            <div className="col-1"></div>

            <div
              className="col-3 card h-25 p-0"
              style={{ boxShadow: "5px 6px #888888" }}
            >
              <Card
                border="dark"
                style={{ width: "100%" }}
                bg="dark"
                text="white"
              >
                <Card.Header>
                  <b>Insert Food Type</b>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <p> Food Type:</p>
                  </Card.Text>
                  <Card.Text>
                    <div className="form-group my-2">
                      <input
                        type="text"
                        className="form-control mt-3"
                        id="foodType"
                        placeholder="Enter food type"
                        value={this.state.foodType}
                        onChange={(evt) => this.updateFoodType(evt)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn  btn-outline-warning w-100 my-2"
                      onClick={() => this.insertFoodType()}
                    >
                      Add
                    </button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-2"></div>

            <div
              className="col-4 card m-0 p-0"
              style={{ boxShadow: "5px 6px #888888" }}
            >
              <Card
                border="dark"
                style={{ width: "100%" }}
                bg="dark"
                text="white"
              >
                <Card.Header>
                  <b>Add Food Item</b>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <div>
                      <div className="add-item rounded mx-2">
                        <form>
                          <div>
                            <label
                              htmlFor="inlineFormCustomSelect"
                              style={{ fontWeight: "bold" }}
                            >
                              Select Food Type
                            </label>
                            <select
                              name="foodTypeOption"
                              className="custom-select"
                              id="inlineFormCustomSelect"
                              onChange={this.handleChange}
                            >
                              <option defaultValue>Choose...</option>
                              {data.menu
                                ? data.menu.map((item, index) => {
                                    return (
                                      <option
                                        className="text-capitalize"
                                        value={index}
                                        key={index}
                                      >
                                        {item.type}
                                      </option>
                                    );
                                  })
                                : null}
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor="itemName"
                              style={{ fontWeight: "bold" }}
                            >
                              Food Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="foodItemName"
                              placeholder="Enter Food Name"
                              value={this.state.foodName}
                              onChange={(evt) => this.updateFoodName(evt)}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="itemPrice"
                              style={{ fontWeight: "bold" }}
                            >
                              Food Price
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="foodPrice"
                              placeholder="Enter Food Price"
                              value={this.state.foodPrice}
                              onChange={(evt) => this.updateFoodPrice(evt)}
                            />
                          </div>
                          <br />
                          <div>
                            <label htmlFor="non_veg">Non - Veg</label>
                            <label className="switch mx-3">
                              <input
                                type="checkbox"
                                checked={non_veg}
                                onChange={this.updateNonVeg}
                              />
                              <span className="slider rounded"></span>
                            </label>
                          </div>

                          <div>
                            <label htmlFor="inlineFormCustomSelect">
                              Pure Jain
                            </label>
                            <label className="switch mx-4">
                              <input
                                type="checkbox"
                                checked={pure_jain}
                                onChange={this.updatePureVeg}
                              />
                              <span className="slider rounded"></span>
                            </label>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="btn btn-outline-warning w-100 mt-2"
                              onClick={() => this.insertFoodItem()}
                            >
                              Add Item
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        ) : (
          <p>Loading .... </p>
        )}
      </div>
    );
  }
}
