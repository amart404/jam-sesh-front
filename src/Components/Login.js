import React, { Component } from 'react'
import '../Stylesheets/Login.css'

import {Link} from 'react-router-dom'

export default class Login extends Component {
    componentDidMount() {
        this.props.logout()
        this.props.hideModal()
    }

    render() {
        return (
            <div className="login-page">
                <header className="login-header">
                    <h1>Jam Sesh</h1>
                </header>
                <form className="login-form" onSubmit={(event) => this.props.logIn(event, this.props.getEmail(), this.props.getPassword())}>
                    <p>Login</p>
                    <br/>
                    <input id="login-email" type="text" placeholder="Email"/>
                    <br/>
                    <input id="login-password" type="password" placeholder="Password"/>
                    <br/>
                    <input id="login-submit" type="submit" value="Sign In"/>
                    <br/>
                    <Link to="/create">New User?</Link>
                </form>
            </div>
        )
    }
}