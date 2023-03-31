import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge';
import { FaShoppingCart } from "react-icons/fa";

/**
* NavigationBar Component
* 
* This component renders the navigation bar for the Pet Universe application.
* @param {object} props - Component props
* @param {function} props.linkClick - Function to handle link clicks
* @param {number} props.itemCount - Number of items in the shopping cart
* @returns {JSX.Element} - Navigation bar JSX element
*/
class NavigationBar extends Component {
    constructor() {
        super();
        this.state = {
            activeLink: "/"
        }
    }

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
        this.setState({ activeLink: value });
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
                <a className={"navbar-brand " + (this.state.activeLink === "/" ? "navbar-brand-active" : "")} href="#" onClick={e => this.handleOnClick(e, "/")}>
                    <div className="col">
                        <img src="./logo192.png" alt="Logo" />
                        <span className="logo-text">Pet Universe</span>
                    </div>
                </a>
                <ul className="navbar-nav mr-auto medium">
                    <li className="nav-item">
                        <a href="#" className={"nav-link " + (this.state.activeLink === "/pets" ? "active-nav-link" : "")} onClick={e => this.handleOnClick(e, "/pets")} >
                            Pets
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className={"nav-link " + (this.state.activeLink === "/supplies" ? "active-nav-link" : "")} onClick={e => this.handleOnClick(e, "/supplies")} >
                            Supplies
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className={"nav-link " + (this.state.activeLink === "/admin" ? "active-nav-link" : "")} onClick={e => this.handleOnClick(e, "/admin")} >
                            Admin
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className={"nav-link " + (this.state.activeLink === "/customer%20service" ? "active-nav-link" : "")} onClick={e => this.handleOnClick(e, "/customer%20service")} >
                            Customer Service
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className={"nav-link " + (this.state.activeLink === "/cart" ? "active-nav-link" : "")} onClick={e => this.handleOnClick(e, "/cart")} >
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
