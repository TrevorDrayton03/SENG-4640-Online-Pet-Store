import React, { Component } from 'react';

class Navbar extends Component {

    handleOnClick(e, value) {
        e.preventDefault();
        this.props.linkClick(value)
    }

    render() {
        return (
            <div className="Container blackBorder">
                <h2>
                    <nav>
                        <ul className="navBarList large center" style={{ flexDirection: 'row', display: 'flex' }}>
                            <li>
                                <a href="/#" onClick={e => this.handleOnClick(e, "/")} >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/#" onClick={e => this.handleOnClick(e, "/pets")} >
                                    Pets
                                </a>
                            </li>
                            <li>
                                <a href="/#" onClick={e => this.handleOnClick(e, "/admin")} >
                                    Admin
                                </a>
                            </li>
                            {/* <li>
                                <a href="/#" onClick={e => this.handleOnClick(e, "/customer%20service")} >
                                    Customer Service
                                </a>
                            </li> */}
                            {/* <li>
                                <a href="/#" onClick={e => this.handleOnClick(e, "/cart")} >
                                    Cart
                                </a>
                            </li> */}
                        </ul>
                    </nav>
                </h2>
            </div>
        );
    }

}

export default Navbar;
