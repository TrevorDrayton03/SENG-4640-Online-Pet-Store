import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge';
import { FaShoppingCart } from "react-icons/fa";

class NavigationBar extends Component {

    handleOnClick(e, value) {
        e.preventDefault();
        this.props.linkClick(value)
    }

    render() {
        return (
            < nav className="navbar navbar-expand-lg large navbar-custom" >
                <a className="navbar-brand" href="#" onClick={e => this.handleOnClick(e, "/")}>
                    <div className="col">
                        <img src="./logo192.png" alt="Logo" />
                        <span class="logo-text">Pet Universe</span>
                    </div>
                </a>
                <ul className="navbar-nav mr-auto medium">
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={e => this.handleOnClick(e, "/pets")} >
                            Pets
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={e => this.handleOnClick(e, "/petsupplies")} >
                            Pet Supplies
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={e => this.handleOnClick(e, "/admin")} >
                            Admin
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={e => this.handleOnClick(e, "/customer%20service")} >
                            Customer Service
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={e => this.handleOnClick(e, "/cart")} >
                            <FaShoppingCart />{" "}
                            <Badge bg="btn-primary">{this.props.itemCount}</Badge>
                        </a>
                    </li>
                </ul>
            </nav >
        );
    }

}

export default NavigationBar;
