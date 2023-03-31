import React, { Component } from 'react';
import DataManager from "./DataManager";

/**
* Admin.js is a component that handles the authentication of the admin user.
* @example
* <Admin handleLogin={handleLogin} admin={true}/>
* @extends React.Component
* @param {function} handleLogin Function passed to props to manage the admin state (admin logged in or not).
* @param {boolean} admin True if admin is logged in, false if admin is not logged in.
* @returns {JSX.Element}
*/
class Admin extends Component {

    constructor(props) {
        super(props);
        /**
        * @property {Object} state - The props object that is passed to the component
        * @property {string} state.username - The username of the admin user
        * @property {string} state.password - The password of the admin user
        */
        this.state = {
            username: '',
            password: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    /**
    * @function handleUsernameChange - Updates the username input value in the component state when the input changes
    * @memberof Admin
    * @param {object} e - The event object
    */
    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    /**
     * @function handlePasswordChange - Updates the password input value in the component state when the input changes
     * @memberof Admin
     * @param {object} e - The event object
     * 
     */
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    /**
     * @function handleLogout - Logs the user out of the admin interface by calling the handleLogin function in the parent component with a value of false and resetting username and password
     * @memberof Admin
     * @param {object} e - The event object
     */
    handleLogout(e) {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            this.props.handleLogin(false);
            this.setState({ username: '', password: '' })
        }
    }

    /**
     * @function handleFormSubmit - Sends a POST request to the server to authenticate the user with the entered username and password
     * If the response is not okay, an error is thrown
     * If the response is okay, the handleLogin function in the parent component is called with a value of true to set the admin state to true
     * @memberof Admin
     * @param {object} e - The event object
     */
    async handleFormSubmit(e) {
        e.preventDefault();
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
            this.props.handleLogin(true);
        } catch (error) {
            console.error(error);
        }
    }

    /**
    * @function render - Renders the component
    * If the admin state is false, a login form is displayed
    * If the admin state is true, a logout button and the DataManager component are displayed
    * @memberof Admin
    * @returns {JSX.Element}
    */
    render() {
        if (!this.props.admin) {
            return (
                <div className="Container">
                    <form onSubmit={this.handleFormSubmit}>
                        <div>
                            <label>
                                <p><strong>Username</strong></p>
                                <input
                                    type="text"
                                    onChange={this.handleUsernameChange}
                                    value={this.state.username}
                                    className='centerText'
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                <p><strong>Password</strong></p>
                                <input
                                    type="password"
                                    onChange={this.handlePasswordChange}
                                    value={this.state.password}
                                    className='centerText'
                                />
                            </label>
                        </div>
                        <div className='centerText'>
                            <button
                                className="btn btn-primary"
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
                            className="btn btn-primary"
                            type="submit"
                            onClick={this.handleLogout}
                            id="logout"
                        >Logout</button>
                    </div>
                    <DataManager />
                </div>
            )
        }
    }
}

export default Admin;
