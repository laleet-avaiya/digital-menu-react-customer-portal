import React, { Component } from "react";
import fire from "../config/fire";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
                <Route path="/menu">
                  <Menu user={user} data={data} />
                </Route>
                <Route path="/qr_code">
                  <MyQRCode user={user} data={data} />
                </Route>
                <Route path="/account">
                  <Account user={user} data={data} />
                </Route>
                <Route path="/food">
                  <Food user={user} data={data} />
                </Route>
              </Switch>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
