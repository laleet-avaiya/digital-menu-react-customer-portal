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
      tabIndex: 0,
      foodType: "",
      foodTypeOption: "",
      foodName: "",
      foodPrice: "",
      veg: false,
      non_veg: false,
      pure_jain: false,
      selectedFood:-1,

    }

    this.getData = this.getData.bind(this);
    this.logout = this.logout.bind(this);
    this.insertFoodType = this.insertFoodType.bind(this);
    this.deleteFoodType = this.deleteFoodType.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.updateFoodName = this.updateFoodName.bind(this);
    this.updateFoodPrice = this.updateFoodPrice.bind(this);
    this.updatePureVeg = this.updatePureVeg.bind(this);

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
  updateFoodName(e) {
    this.setState({
      foodName: e.target.value
    });
  }

  updateFoodPrice(e) {
    this.setState({
      foodPrice: e.target.value
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
          menu: [
            {
              type: "Drink",
              items: [
                {
                  itemName: 'test',
                  price: 0
                }
              ]
            }
          ]
        })
      }
    });
  }

  deleteFoodType(index) {
    fire.database().ref('restaurant/' + this.state.user.uid + '/menu/' + index).remove();
  }

  insertFoodType() {
    fire.database().ref('restaurant/' + this.state.user.uid + '/menu/' + this.state.data.menu.length).set(
      {
        type: this.state.foodType,
        items: [
          {
            itemName: 'test',
            price: 0,
            veg: false,
            non_veg: false,
            pure_jain: false,
          }
        ]
      }
    ).then(() => this.setState({ foodType: "",itemName: "",price: 0,veg: false,non_veg: false, pure_jain: false, }))
  }

  insertFoodItem() {
    var url = 'restaurant/' + this.state.user.uid + '/menu/' + this.state.foodTypeOption + '/items/' + this.state.data.menu[this.state.foodTypeOption].items.length;
    fire.database().ref(url).set(
      {
        itemName: this.state.foodName,
        price: this.state.foodPrice,
        veg: this.state.veg,
        non_veg: this.state.non_veg,
        pure_jain: this.state.pure_jain
      }
    ).then(
      () => {
        this.setState({ foodName: "", foodPrice: " ", veg: false, non_veg: false, pure_jain: false })
      }
    )
  }

  changeTab(tabIndex) {
    this.setState({ tabIndex: tabIndex })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  updateVegNonVeg(event) {
    var number = event.target.value;
    if (number == 1)
      this.setState({ veg: true, non_veg: false })
    else if (number == 2)
      this.setState({ veg: false, non_veg: true })
  }

  updatePureVeg() {
    if(this.state.pure_jain)
      this.setState({ pure_jain: !this.state.pure_jain })
    else
      this.setState({ pure_jain: !this.state.pure_jain,veg: true, non_veg: false })
  }

  updateSelectedFood(number){
    this.setState({selectedFood:number})
  }
  render() {
    var { user, data, registration_step, tabIndex, foodTypeOption, foodName, foodPrice, pure_jain,selectedFood } = this.state;
    return (
      <div className="mt-3 container">
        <div>
          <p className="float-left font-weight-bold">Email : {user ? user.email : null}</p>
          <p className="float-right font-weight-bold">Restaurant ID : {user ? user.uid : null} </p>
        </div>
        <br />
        <hr />
        <button type="button" className="btn btn-outline-primary m-1" onClick={() => this.changeTab(0)}>Add Food Type</button>
        <button type="button" className="btn btn-outline-danger m-1" onClick={() => this.changeTab(2)}>My Menu</button>
        <button type="button" className="btn btn-outline-warning m-1" onClick={() => this.changeTab(3)}> My QR Code</button>
        <button type="button" className="btn btn-outline-info m-1 float-right" onClick={this.logout}> Logout</button>
        <hr />

        {
          tabIndex === 0 && data ?
            <div className="row food-type">
              <div className="col-3">

                <div className="form-group">
                  <label htmlFor="foodType font-weight-bold">Food Type</label>
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
              <div className="col-5">

                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Food Types</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.menu.map((item, index) => {
                      return <tr key={index}>
                        <td className="text-capitalize">{item.type}</td>
                        <td><span className="badge badge-pill badge-danger m-1"
                          onClick={() => {
                            if (window.confirm('Are you sure you wish to delete this item?'))
                              this.deleteFoodType(index)
                          }}
                        >Delete</span></td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>

              <div className="col-4">
                <div className="add-item bg-light rounded py-3">
                  <form>
                    <div className="col-auto my-1">
                      <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Select Food Type</label>
                      <select name="foodTypeOption"
                        className="custom-select mr-sm-2"
                        id="inlineFormCustomSelect"
                        onChange={this.handleChange}
                      >
                        <option selected>Choose...</option>
                        {data.menu.map((item, index) => { return <option className="text-capitalize" value={index}>{item.type}</option> })}
                      </select>
                    </div>

                    <div className="col-auto my-1">
                      <label className="mr-sm-2" htmlFor="itemName">Food Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="foodItemName"
                        placeholder="Enter Food Name"
                        value={this.state.foodName}
                        onChange={evt => this.updateFoodName(evt)}
                      />
                    </div>

                    <div className="col-auto my-1">
                      <label className="mr-sm-2" htmlFor="itemPrice">Food Price</label>
                      <input
                        type="text"
                        className="form-control"
                        id="foodPrice"
                        placeholder="Enter Food Price"
                        value={this.state.foodPrice}
                        onChange={evt => this.updateFoodPrice(evt)}
                      />
                    </div>


                    <div className="col-auto my-1">
                      <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Veg / Non Veg</label>
                      <select name="veg"
                        className="custom-select mr-sm-2"
                        id="inlineFormCustomSelect"
                        onChange={this.updateVegNonVeg}
                      >
                        <option selected>Choose...</option>
                        <option className="text-capitalize" value={1}>Veg</option>
                        <option className="text-capitalize" value={2}>Non-Veg</option>
                      </select>
                    </div>
                    <br />
                    {/* <div className="col-auto mx-1">
                      <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Pure Jain</label>
                      <label className="switch">
                        <input type="checkbox" checked={pure_jain} onChange={this.updatePureVeg} />
                        <span className="slider rounded"></span>
                      </label>
                    </div>
                    <div className="col-auto mx-1">
                      <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Pure Jain</label>
                      <label className="switch">
                        <input type="checkbox" checked={pure_jain} onChange={this.updatePureVeg} />
                        <span className="slider rounded"></span>
                      </label>
                    </div> */}

                    <div className="col-auto mx-1">
                      <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Pure Jain</label>
                      <label className="switch">
                        <input type="checkbox" checked={pure_jain} onChange={this.updatePureVeg} />
                        <span className="slider rounded"></span>
                      </label>
                    </div>
                    <div className="p-3">
                      <button type="button" className="btn btn-outline-success my-3 w-100" onClick={() => this.insertFoodItem()}>Add Item</button>
                    </div>
                  </form>

                </div>

              </div>
            </div>
            : tabIndex === 2 && data ?
              <div className="my-menu">

                <div className="row">

                  <div className="col-4">
                    <h3>Food Types</h3>
                    <table className="table table-bordered">
                      <tbody>
                        {data.menu.map((item, index) => {
                          return <tr key={index}>
                            <td className="text-capitalize">{item.type}</td>
                            <td><span className="badge badge-pill badge-danger m-1"
                              onClick={() => {
                                if (window.confirm('Are you sure you wish to delete this item?'))
                                  this.deleteFoodType(index)
                              }}
                            >Delete</span></td>
                             <td><span className="badge badge-pill badge-info m-1"
                              onClick={() => this.updateSelectedFood(index)}
                            >View Food Item</span></td>
                          </tr>
                        })}
                      </tbody>
                    </table>
                  </div>
                  {
                    selectedFood > -1?<div className="col-8">
                    <h3>Food Items</h3>
                  {data.menu[selectedFood].items.map((item, index) => {
                    return <div className="card m-2 p-2">
                        <li>{item.itemName}</li>
                        <li>{item.price}</li>
                        <li>{item.veg ? "Veg" : ""}</li>
                        <li>{item.non_veg ? "Non Veg": ""}</li>
                        <li>{item.pure_jain ? "Jain":""}</li>
                    </div>
                  })
                  }
                  </div>:<div className="col-8"></div>
                  }
                </div>
              </div>

              :

              <div className="qr-code">
                QR Code
        </div>

        }
      </div>
    )
  }
}


