import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// each cart item needs a name, price, and image
// if the item is a supply, then it needs a quantity

class CartItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row key={this.props.id} style={{ alignItems: "center", margin: 20 }}>
                <Col xs lg="2">
                    <h2>{this.props.name}</h2>
                </Col>
                <Col xs lg="2">
                    <img
                        className="d-block w-100"
                        alt="Item"
                        src={this.props.url}
                    />
                </Col>
                <Col className="d-flex justify-content-end" xs lg="2">
                    <div>
                        <p>Price: ${this.props.price}</p>
                        <p>Quantity: 1</p>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default CartItem;
