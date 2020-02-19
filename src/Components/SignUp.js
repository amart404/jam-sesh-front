import React, { Component } from 'react'
import '../Stylesheets/SignUp.css'

export default class SignUp extends Component {
    render() {
        return (
            <div className="sign-up">
                <header className="create-header">
                    <h1 id="form-title">New User</h1>
                </header>
                <form className="new-user" onSubmit={this.props.getNewUser}>
                    <input id="username" type="text" placeholder="Username"/>
                    <br/>
                    <input id="email" type="text" placeholder="Email"/>
                    <br/>
                    <input id="password" type="password" placeholder="Password"/>
                    <br/>
                    <input id="confirm" type="password" placeholder="Confirm Password"/>
                    <br/>
                    <input id="new-sub" type="submit" value="Create User" />
                </form>
            </div>
        )
    }
}