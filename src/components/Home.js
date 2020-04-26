import React, { Component } from "react";
import fire from "../config/fire";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import Account from "./Account";
import MyQRCode from "./MyQRCode";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Menu from "./Menu";
import Food from "./Food";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      data: null,
    };

    this.getData = this.getData.bind(this);
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
            food_type: false,
            date_of_joining: new Date().toUTCString(),
            last_updated: new Date().toUTCString(),
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

  render() {
    var { user, data } = this.state;
    return (
      <div>
        <Navbar></Navbar>

        <div className="row main-page" style={{ backgroundColor: "#f0f8fb" }}>
          <Sidebar></Sidebar>

          <div className="p-4 right-dashboard col-11">
            {user ? (
              <Switch>
                <Route exact path="/menu">
                  <Menu user={user} data={data} />
                </Route>
                <Route exact path="/qr_code">
                  <MyQRCode user={user} data={data} />
                </Route>
                <Route exact path="/account">
                  <Account user={user} data={data} />
                </Route>
                <Route exact path="/food">
                  <Food user={user} data={data} />
                </Route>
                <Route exact path="/">
                  <div>
                    {data && !data.restaurant_name ? (
                      <div>Enter Restaurant Name</div>
                    ) : null}
                    {data && !data.restaurant_address ? (
                      <div>Enter Restaurant Address</div>
                    ) : null}
                    {data && !data.restaurant_phone ? (
                      <div>Enter Restaurant Phone</div>
                    ) : null}
                    {data && !data.contact_person_name ? (
                      <div>Enter Contact Person Name</div>
                    ) : null}
                    {data && !data.contact_person_phone ? (
                      <div>Enter Contact Person Phone</div>
                    ) : null}
                    <h2>Welcome ...</h2>
                    <hr />
                    <section className="ml-5 mt-5">
                      <h4>
                        <li>
                          Mange/Add your restaurant menu from "Food" section.
                        </li>
                      </h4>
                      <h4>
                        <li>
                          Delete/Update/View your menu from "Menu" section.
                        </li>
                      </h4>
                      <h4>
                        <li>Download your QR code from "QR Code" section.</li>
                      </h4>
                      <h4>
                        <li>
                          Update your restaurant details (Name , Address, Phone
                          ) from "Account" section.
                        </li>
                      </h4>
                    </section>
                  </div>
                </Route>
              </Switch>
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
        </div>
      </div>
    );
  }
}
