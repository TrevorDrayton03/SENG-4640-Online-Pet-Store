import React, { Component } from 'react';
import DataManager from "./DataManager";

class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
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
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            this.props.handleLogin(false);
        }
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
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        if (!this.props.admin) {
            return (
                <div className="Container">
                    <form onSubmit={this.handleFormSubmit}>
                        <label>
                            <p><strong>Username</strong></p>
                            <input
                                type="text"
                                onChange={this.handleUsernameChange}
                                value={this.state.username}
                            />
                        </label>
                        <label>
                            <p><strong>Password</strong></p>
                            <input
                                type="password"
                                onChange={this.handlePasswordChange}
                                value={this.state.password}
                            />
                        </label>
                        <div>
                            <button
                                className="btn btn-secondary"
                                type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            )
        }

        else {
            return (
                <div className="Container">
                    <div className="centerText">
                        <button
                            className="btn btn-secondary"
                            type="submit"
                            onClick={this.handleLogout}
                            id="logout"
                        >Logout</button>
                    </div>
                    <DataManager
                    />
                </div>
            )
        }
    }
}

export default Admin;
