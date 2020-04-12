import React, { Component } from "react";
import fire from "../config/fire";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      data: props.data,
      selectedFood: -1,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ user: props.user, data: props.data });
  }

  updateSelectedFood(number) {
    this.setState({ selectedFood: number });
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

  render() {
    var { user, data, selectedFood } = this.state;

    return (
      <div>
        {data && user ? (
          <div className="my-menu">
            <div>
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
                              className="badge badge-info ml-1"
                              onClick={() => this.updateSelectedFood(index)}
                            >
                              View
                            </span>
                          </p>
                        );
                      })
                    : null}
                </p>
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
                        ? data.menu[selectedFood].items.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="text-center">{index + 1}</td>
                                <td className="text-capitalize">
                                  {item.itemName}
                                </td>
                                <td className="text-center">{item.price}</td>
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
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="col-8"></div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
