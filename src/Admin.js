import React, { Component } from 'react';
import DataManager from "./DataManager";

// https://www.positronx.io/how-to-insert-form-values-or-data-in-react-table-component/
// making admin alwyas true in App while I'm developing this 
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
        /*
        - type must be pets or supplies
        - sort by column asc/desc
        - search for a value and it appears in the table
        - add button to create a new row to fill in followed by a submit button
        - edit button on a row to begin editing the data followed by a submit button
        - delete button by the row followed by a confirm button
        - DataItem could be a form when editing
        */

        else {
            return (
                <div className="Container">
                    <div className="Admin">
                        <h2>Log Out</h2>
                        <button type="submit" onClick={this.handleLogout}> Logout</button>
                    </div>
                    <DataManager

                    />
                </div>
            )
        }
    }
}

export default Admin;
