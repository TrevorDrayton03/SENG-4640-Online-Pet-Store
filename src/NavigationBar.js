import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge';
import { FaShoppingCart } from "react-icons/fa";

/**
* NavigationBar.js is the navigation bar component of the application and handles routing on the front end.
* @example
*    <NavigationBar
*      linkClick={this.handleLinkClick.bind(this)}
*      itemCount={this.state.cartItems.length}
*      route={this.state.route}
*    />
* @param {Object} props - Component props
* @param {function} props.linkClick - Function to handle link clicks
* @param {number} props.itemCount - Number of items in the shopping cart
* @property {number} state.route - The current route for selecting which nav-link to be active.
* @extends React.Component
* @returns {JSX.Element} - Navigation bar JSX element
*/
class NavigationBar extends Component {
    /**
    * Handle link click event
    * 
    * Prevents default event and calls linkClick function from props
    * 
    * @param {object} e - Click event object
    * @param {string} value - Link value to pass to linkClick function
    */
    handleOnClick(e, value) {
        e.preventDefault();
        this.props.linkClick(value)
    }

    /**
    * 
    * @function render
    * @description Renders the NavigationBar component.
    * @memberof NavigationBar
    * @returns {JSX.Element} JSX element.
    */
    render() {
        return (
            < nav className="navbar navbar-expand-lg large navbar-custom" >
                <a className={"navbar-brand "} href="#" onClick={e => this.handleOnClick(e, "/")}>
                    <div className="col">
                        <img src="./logo192.png" alt="Logo" />
                        <span className="logo-text">Pet Universe</span>
                    </div>
                </a>
                <ul className="navbar-nav mr-auto medium">
                    <li className="nav-item">
                        <a href="#" className={"nav-link " + (this.props.route === "/pets" ? "active-nav-link" : "")} onClick={e => this.handleOnClick(e, "/pets")} >
                            Pets
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className={"nav-link " + (this.props.route === "/supplies" ? "active-nav-link" : "")} onClick={e => this.handleOnClick(e, "/supplies")} >
                            Supplies
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className={"nav-link " + (this.props.route === "/admin" ? "active-nav-link" : "")} onClick={e => this.handleOnClick(e, "/admin")} >
                            Admin
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className={"nav-link " + (this.props.route === "/customer%20service" ? "active-nav-link" : "")} onClick={e => this.handleOnClick(e, "/customer%20service")} >
                            Customer Service
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className={"nav-link " + (this.props.route === "/cart" ? "active-nav-link" : "")} onClick={e => this.handleOnClick(e, "/cart")} >
                            <FaShoppingCart></FaShoppingCart>
                            <Badge bg="btn-primary">{this.props.itemCount}</Badge>
                        </a>
                    </li>
                </ul>
            </nav >
        );
    }

}

export default NavigationBar;
