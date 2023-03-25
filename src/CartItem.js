import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
class CartItem extends Component {

    render() {
        return (
            <div className="pinkbg Container" style={{ margin: '10px' }}>
                <div className="row">
                    <div className="col" style={{ width: "calc(100% - 90px)", display: "flex" }}>
                        <div className="col">
                            <img
                                className="cartImg"
                                alt="Item"
                                src={this.props.url}
                            />
                        </div>
                        <div className="col smallPad" style={{ padding: 5, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <p style={{ textAlign: "right" }}>Name:</p>
                            <p style={{ textAlign: "right" }}>Price:</p>
                        </div>
                        <div className="col smallPad" style={{ padding: 5, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <p style={{ textAlign: "left", fontWeight: 'bold' }}>{this.props.name}</p>
                            <p style={{ textAlign: "left", fontWeight: 'bold' }}>${this.props.price}</p>
                        </div>
                    </div>
                    <div className="col" style={{ position: "relative" }}>
                        <Button
                            onClick={() => this.props.removeFromCart(this.props.id)}
                            variant="danger"
                            style={{ position: "absolute", bottom: 0, right: 0 }}
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartItem;
