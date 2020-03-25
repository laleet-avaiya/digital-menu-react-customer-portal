import React, { Component } from 'react'
import fire from '../../config/fire';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class Login extends Component {

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
        fire
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then()
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
            <div className="container">
                <form action="#" className="bg-light text-dark rounded-sm mx-auto my-5 p-5">
                    <h1 className="text-center">Login</h1>
                    <div className="form-group">
                        <p htmlFor="email" className='text-danger'>{this.state.error}</p>
                        <label htmlFor="email">Email address:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={this.handleChange} required />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-outline-danger btn-block"
                        onClick={this.login}
                    >Login</button>

                    <Link to="/signup" className="btn btn-outline-success btn-block">Click here to Signup</Link>

                </form>
            </div>
        )
    }
}
