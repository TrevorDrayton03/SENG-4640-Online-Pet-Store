import React, { Component } from 'react';

class Navbar extends Component {

    handleOnClick(e, value) {
        e.preventDefault();
        this.props.linkClick(value)
    }

    render() {
        return (
            <div className="Navbar">
                <h2>
                    <nav>
                        <ul className="navBarList" style={{ flexDirection: 'row', display: 'flex' }}>
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
                        </ul>
                    </nav>
                </h2>
            </div>
        );
    }

}

export default Navbar;
