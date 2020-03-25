import React, { Component } from 'react'
import fire from '../config/fire';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      user_login: false,
      data: null,
      registration_step: 1,
      foodType: ""
    }

    this.getData = this.getData.bind(this);
    this.logout = this.logout.bind(this);
    this.insertFoodType = this.insertFoodType.bind(this);

  }
  async componentDidMount() {
    await this.authListener();
    this.getData();
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.setState({ user: user, user_login: true });
      }
      else {
        this.setState({ user: false });
      }
    });
  }

  logout(e) {
    fire.auth().signOut().then(
      this.setState({
        user: null,
        user_login: false
      })
    );
  }

  updateFoodType(e) {
    this.setState({
      foodType: e.target.value
    });
  }

  getData() {
    const itemsRef = fire.database().ref('restaurant/' + this.state.user.uid);
    itemsRef.on('value', (snapshot) => {
      if (snapshot.val()) {
        let items = snapshot.val();
        this.setState({
          data: items
        });
      } else {
        fire.database().ref('restaurant/' + this.state.user.uid).set({
          admin_email: this.state.user.email,
          restaurant_id: this.state.user.uid,
          restaurant_name: "Ashish Restaurant",
          restaurant_address: "102 - 103, Sai Residency, Amroli Katargam Road, Near Gajera School, Katargam, Surat",
          restaurant_phone: "9897969599",
          contact_person_name: "Aniket Patel",
          contact_person_phone: "7874353232",
          date_of_joining: Date.now(),
          menu: []
        })
      }
    });
  }

  insertFoodType() {
    fire.database().ref('restaurant/' + this.state.user.uid + '/menu/' + this.state.data.menu.length).set(
      {
        type: this.state.foodType,
        items: []
      }
    ).then( () => this.setState({foodType:""}))
  }
  render() {
    var { user, data, registration_step } = this.state;
    return (
      <div className="m-3">
        <div>
          <p className="float-left">Email : {user ? user.email : null}</p>
          <p className="float-right">Restaurant ID : {user ? user.uid : null} </p>
        </div>
        <br />
        <hr />
        <button type="button" className="btn btn-outline-primary m-1">Add Food Type</button>
        <button type="button" className="btn btn-outline-success m-1">Add Food Item</button>
        <button type="button" className="btn btn-outline-danger m-1">My Menu</button>
        <button type="button" className="btn btn-outline-warning m-1"> My QR Code</button>
        <button type="button" className="btn btn-outline-info m-1 float-right" onClick={this.logout}> Logout</button>
        <hr />
        <div className="row">
          <div className="col-6">
            
              <div class="form-group">
                <label for="foodType">Food Type</label>
                <input
                  type="text"
                  className="form-control w-75"
                  id="foodType"
                  placeholder="Enter food type"
                  value={this.state.foodType}
                  onChange={evt => this.updateFoodType(evt)}
                />
              </div>
              <button type="button" className="btn btn-outline-success m-1" onClick={() => this.insertFoodType()}>Add</button>
            
          </div>
          <div className="col-6">
            {data ?
              <ul>
                {data.menu.map((item, index) => (<li key={index}>{item.type}</li>))}
              </ul> : <span></span>}
          </div>
        </div>

      </div>
    )
  }
}
