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
            <Row key={this.props.id} style={{ flexDirection: "row", alignItems: "center", margin: 20, justifyContent: "center", flexBasis: "25%" }}>
                <Col style={{ flex: 1, alignItems: "center" }}>
                    <h2>{this.props.name}</h2>
                </Col>
                <Col style={{ flex: 1, alignItems: "center" }}>
                    <img
                        className="d-block w-100"
                        alt="Item"
                        src={this.props.url}
                    />
                </Col>
                <Col className="d-flex justify-content-end" style={{ flex: 1, alignItems: "center", flexBasis: "25%" }}>
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
