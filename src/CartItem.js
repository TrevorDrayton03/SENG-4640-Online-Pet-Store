import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
class CartItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <img
                        className="cartImg"
                        alt="Item"
                        src={this.props.url}
                    />
                </div>
                <div className="col">
                    <p style={{ textAlign: "left" }}>Name:</p>
                    <p style={{ textAlign: "left" }}>Price:</p>
                </div>
                <div className="col">
                    <p style={{ textAlign: "left" }}>{this.props.name}</p>
                    <p style={{ textAlign: "left" }}>${this.props.price}</p>
                </div>
                <div className="col" style={{ padding: 0, margin: 0 }}>
                    <Button
                        onClick={() => this.props.removeFromCart(this.props.id)}
                        variant="outline-danger"
                    >
                        Remove
                    </Button>
                </div>
            </div>
        );
    }
}

export default CartItem;
