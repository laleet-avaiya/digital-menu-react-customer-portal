import React, { Component } from "react";
import fire from "../config/fire";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import QRCode from "qrcode.react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      user_login: false,
      data: null,
      registration_step: 1,
      tabIndex: 0,
      foodType: "",
      foodTypeOption: "",
      foodName: "",
      foodPrice: "",
      veg: true,
      non_veg: false,
      pure_jain: false,
      selectedFood: -1,
      qr_code_url: "",
    };

    this.getData = this.getData.bind(this);
    this.logout = this.logout.bind(this);
    this.insertFoodType = this.insertFoodType.bind(this);
    this.deleteFoodType = this.deleteFoodType.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.updateFoodName = this.updateFoodName.bind(this);
    this.updateFoodPrice = this.updateFoodPrice.bind(this);
    this.updateNonVeg = this.updateNonVeg.bind(this);
    this.updatePureVeg = this.updatePureVeg.bind(this);
    this.downloadQR = this.downloadQR.bind(this);
  }
  async componentDidMount() {
    await this.authListener();
    this.setState({
      qr_code_url:
        "https://practical-ritchie-dd48fb.netlify.com/?restaurant_id=" +
        this.state.user.uid,
    });
    this.getData();
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.setState({ user: user, user_login: true });
      } else {
        this.setState({ user: false });
      }
    });
  }

  logout(e) {
    fire
      .auth()
      .signOut()
      .then(
        this.setState({
          user: null,
          user_login: false,
        })
      );
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
  getData() {
    const itemsRef = fire.database().ref("restaurant/" + this.state.user.uid);
    itemsRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        let items = snapshot.val();
        this.setState({
          data: items,
        });
      } else {
        fire
          .database()
          .ref("restaurant/" + this.state.user.uid)
          .set({
            admin_email: this.state.user.email,
            restaurant_id: this.state.user.uid,
            restaurant_name: false,
            restaurant_address: false,
            restaurant_phone: false,
            contact_person_name: false,
            contact_person_phone: false,
            date_of_joining: Date.now(),
            menu: [
              {
                type: "Drink",
                items: [
                  {
                    itemName: "test",
                    price: 0,
                  },
                ],
              },
            ],
          });
      }
    });
  }

  deleteFoodType(index) {
    fire
      .database()
      .ref("restaurant/" + this.state.user.uid + "/menu/" + index)
      .remove();
  }

  deleteFoodItem(index, itemIndex) {
    fire
      .database()
      .ref(
        "restaurant/" +
          this.state.user.uid +
          "/menu/" +
          index +
          "/items/" +
          itemIndex
      )
      .remove();
    this.setState({ selectedFood: -1 });
  }

  insertFoodType() {
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

  insertFoodItem() {
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

  changeTab(tabIndex) {
    this.setState({ tabIndex: tabIndex });
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

  updateSelectedFood(number) {
    this.setState({ selectedFood: number });
  }

  downloadQR() {
    const canvas = document.getElementById("qr-code");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = this.state.user.uid + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  render() {
    var {
      user,
      qr_code_url,
      data,
      registration_step,
      tabIndex,
      foodTypeOption,
      foodName,
      foodPrice,
      non_veg,
      pure_jain,
      selectedFood,
      qr_code_url,
    } = this.state;
    return (
      <div>
        <div className="row nav navbar navbar-expand-sm bg-dark navbar-dark text-white justify-content-center">
          <h6>Digital Menu</h6>
        </div>

        <div className="row main-page" style={{ backgroundColor: "#f0f8fb" }}>
          <div
            className="col-1 flex-fill justify-content-center pr-0 bg-dark"
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            <button
              type="button"
              className="btn w-100 mt-5 text-white"
              onClick={() => this.changeTab(0)}
            >
              <i class="fa fa-heart"></i>
              <p>Food</p>
            </button>

            <button
              type="button"
              className="btn w-100 text-white"
              onClick={() => this.changeTab(2)}
            >
              <i class="fa fa-book"></i>
              <p>Menu</p>
            </button>

            <button
              type="button"
              className="btn w-100 text-white"
              onClick={() => this.changeTab(3)}
            >
              <i class="fa fa-qrcode"></i>
              <p>QR Code</p>
            </button>

            <button
              type="button"
              className="btn w-100 text-white"
              onClick={() => this.changeTab(3)}
            >
              <i class="fa fa-user"></i>
              <p>Account</p>
            </button>

            <button
              type="button"
              className="btn w-100 text-white"
              onClick={this.logout}
            >
              <i class="fa fa-sign-out-alt"></i>
              <p>Logout</p>
            </button>
          </div>

          <div className="p-4 right-dashboard col-11">
            {tabIndex === 0 && data ? (
              <div>
                <div className="row mx-1">
                  <div className="form-group">
                    <label style={{ fontWeight: "bold", fontFamily: "arial" }}>
                      Food Types
                    </label>
                  </div>
                  <table className="table table-bordered w-100">
                    <tbody>
                      {data.menu
                        ? data.menu.map((item, index) => {
                            return (
                              <button
                                type="button"
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
                              </button>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                </div>

                <div className="row px-4 mt-3">
                  <div className="col-1"></div>
                  <div
                    className="col-3 card h-25 p-0"
                    style={{ boxShadow: "5px 10px #888888" }}
                  >
                    <div className="m-0 nav navbar navbar-expand-sm bg-success navbar-success text-white justify-content-center">
                      <h6 style={{ fontWeight: "bold" }}> Add Food Type</h6>
                    </div>

                    <div className="form-group m-2">
                      <input
                        type="text"
                        className="form-control mt-3"
                        id="foodType"
                        placeholder="Enter food type"
                        value={this.state.foodType}
                        onChange={(evt) => this.updateFoodType(evt)}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-success m-2"
                      onClick={() => this.insertFoodType()}
                    >
                      Add
                    </button>
                  </div>

                  <div className="col-2"></div>

                  <div
                    className="col-4 card m-0 p-0"
                    style={{ boxShadow: "5px 10px #888888" }}
                  >
                    <div className="m-0 nav navbar navbar-expand-sm bg-success navbar-success text-white justify-content-center">
                      <h6 style={{ fontWeight: "bold" }}> Add Food Item</h6>
                    </div>

                    <div className="p-2 mt-3">
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
                              <option selected>Choose...</option>
                              {data.menu
                                ? data.menu.map((item, index) => {
                                    return (
                                      <option
                                        className="text-capitalize"
                                        value={index}
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
                              className="btn btn-outline-success w-100 mt-2"
                              onClick={() => this.insertFoodItem()}
                            >
                              Add Item
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : tabIndex === 2 && data ? (
              <div className="my-menu">
                <div>
                  <div className="row mx-1">
                    <div className="form-group">
                      <label
                        style={{ fontWeight: "bold", fontFamily: "arial" }}
                      >
                        Food Types
                      </label>
                    </div>
                    <table className="table table-bordered w-100">
                      <tbody>
                        {data.menu
                          ? data.menu.map((item, index) => {
                              return (
                                <button
                                  type="button"
                                  className="btn btn-light text-capitalize m-1"
                                  style={{
                                    backgroundColor: "#ffffff",
                                    fontWeight: "bold",
                                  }}
                                  key={index}
                                >
                                  {item.type}
                                  <span
                                    className="badge badge-info ml-1"
                                    onClick={() =>
                                      this.updateSelectedFood(index)
                                    }
                                  >
                                    View
                                  </span>
                                </button>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  {selectedFood > -1 ? (
                    <div className="mx-3 menu-items w-100">
                      <table className="table table-bordered">
                        {data.menu[selectedFood].items &&
                        data.menu[selectedFood].items.length > 0 ? (
                          <thead>
                            <tr>
                              <td className="text-capitalize">Sr. No.</td>
                              <td className="text-capitalize">Name</td>
                              <td className="text-capitalize">Price (Rs.)</td>
                              <td className="text-capitalize">Veg</td>
                              <td className="text-capitalize">Pure Jain</td>
                              <td className="text-capitalize">Non-Veg</td>
                              <td className="text-capitalize">Action</td>
                            </tr>
                          </thead>
                        ) : (
                          <div></div>
                        )}
                        <tbody>
                          {data.menu[selectedFood].items
                            ? data.menu[selectedFood].items.map(
                                (item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className="text-center">
                                        {index + 1}
                                      </td>
                                      <td className="text-capitalize">
                                        {item.itemName}
                                      </td>
                                      <td className="text-center">
                                        {item.price}
                                      </td>
                                      <td className="text-center">
                                        {item.veg ? "Veg" : "*"}
                                      </td>
                                      <td className="text-center">
                                        {item.pure_jain ? "Jain" : "*"}
                                      </td>
                                      <td className="text-center">
                                        {item.non_veg ? "Non Veg" : "*"}
                                      </td>

                                      <td>
                                        <span
                                          className="badge badge-pill badge-info m-1"
                                          onClick={() => {
                                            if (
                                              window.confirm(
                                                "Are you sure you wish to delete this item?"
                                              )
                                            )
                                              this.deleteFoodItem(index);
                                          }}
                                        >
                                          {" "}
                                          U{" "}
                                        </span>
                                        <span
                                          className="badge badge-pill badge-danger m-1"
                                          onClick={() => {
                                            if (
                                              window.confirm(
                                                "Are you sure you wish to delete this item?"
                                              )
                                            )
                                              this.deleteFoodItem(
                                                selectedFood,
                                                index
                                              );
                                          }}
                                        >
                                          {" "}
                                          X{" "}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                }
                              )
                            : null}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="col-8"></div>
                  )}
                </div>
              </div>
            ) : (
              <div className="qr-code">
                <QRCode
                  className="qr-code-box"
                  id="qr-code"
                  value={qr_code_url}
                  size={290}
                  level={"H"}
                  includeMargin={true}
                />
                <br />
                <button
                  type="button"
                  className="btn btn-outline-success my-3"
                  onClick={() => this.downloadQR()}
                >
                  Download QR
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
