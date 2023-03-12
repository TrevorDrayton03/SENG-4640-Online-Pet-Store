import React, { Component } from 'react';

class Admin extends Component {

    // need a form to enter password and username
    // need a fetch to check if logInAttempt is true or false
    // change the appstate based on the results
    // need a logout button if user is logged in
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loggedIn: false
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

    }
    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleLogout(e) {
        this.props.handleLogin(false);
    }
    async handleFormSubmit(e) {
        e.preventDefault();
        // Send a POST request to the server to authenticate the user
        try {
            const response = await fetch('http://localhost:3000/api/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });

            if (!response.ok) {
                throw new Error('Failed to log in');
            }

            // Log in was successful
            this.props.handleLogin(true);
            this.setState({ loggedIn: true })
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        if (!this.props.admin) {
            return (
                <div className="Admin" style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <h2>Log In</h2>
                    <form onSubmit={this.handleFormSubmit}>
                        <label>
                            <p>Username</p>
                            <input
                                type="text"
                                onChange={this.handleUsernameChange}
                                value={this.state.username}
                            />
                        </label>
                        <label>
                            <p>Password</p>
                            <input
                                type="password"
                                onChange={this.handlePasswordChange}
                                value={this.state.password}
                            />
                        </label>
                        <div>
                            <button
                                type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            )
        }
        else {
            return (
                <div className="Admin">
                    <h2>Log Out</h2>
                    <button type="submit" onClick={this.handleLogout}> Logout</button>
                </div>
            )
        }
    }
}

export default Admin;
