import React, { Component } from 'react'
import fire from '../../config/fire';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Box, Typography, makeStyles, TextField, CardActionArea, CardMedia, Card, CardActions, CardContent } from '@material-ui/core/';

export default class TestLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
    }

    login(e) {
        e.preventDefault();
        console.log("user try to login...");
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then()
            .catch((err) => this.setState({ error: "Invalid Email or password" }));
    }

    signup(e) {
        e.preventDefault();
        this.props.gotoSignup();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }



    render() {
        return (
            <div>
                <Card style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", minWidth: 345, }}>
                    <CardMedia
                        style={{ height: 140 }}
                        image={require('../../img/rose.jpg')}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <form noValidate autoComplete="off">

                            <TextField
                                id="outlined-name"
                                label="Name"
                                margin="normal"
                                variant="outlined"
                                style={{ width: "100%" }}
                                name="email"
                                onChange={this.handleChange} required
                            />
                            <br />
                            <TextField
                                id="standard-password-input"
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                                style={{ width: "100%" }}
                                onChange={this.handleChange} required
                            />
                            <br />
                            {/* <Button variant="outlined" color="primary" style={{ marginTop: "5%", marginLeft: "auto", marginRight: "auto", width: "100%" }}  onClick={this.login}>Login</Button> */}
                            <button
                                type="submit"
                                className="btn btn-outline-danger btn-block"
                                onClick={this.login}
                            >Login</button>
                            
                            <Link to="/signup" className="btn btn-outline-success btn-block">Click here to Signup</Link>
                            
                        </form>
                    </CardContent>
                </Card>


            </div>
        )
    }
}
