import React, { Component } from 'react'
import fire from '../../config/fire'
import Login from './Login';
import Signup from './signup'
export default class auth extends Component {
    constructor(){
        super()
        this.state = {
            page:1,
            email: '',
            password: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
    }


    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then()
            .catch((err) => console.log(err));
    }

    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then()
            .catch((err) => console.log(err));
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    gotoSignup = () => this.setState({page:2});
    

    gotoLogin = ()=>this.setState({page:1});

    render() {
        return (
            <div>
                {this.state.page===1 ? (<Login gotoSignup={this.gotoSignup}/>) : (<Signup gotoLogin={this.gotoLogin}/>)}
            </div>
        )
    }
}
