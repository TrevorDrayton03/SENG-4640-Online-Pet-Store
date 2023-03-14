import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// https://react-bootstrap.github.io/layout/grid/
// https://codesandbox.io/s/react-bootstrap-shopping-cart-example-3ym4j?file=/src/index.js:509-518

// cart needs to be able to have multiple items (pets, supplies) which can be added or removed
// cart needs to sum the total price of each item
// cart needs to have a checkout process
// add to cart option for pet details and supplies details 

class Cart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Cart">
                <h2>This is the cart component</h2>
                <Container>
                    <Row>1</Row>
                    <Row>2</Row>
                    <Row>3</Row>
                    <Row>4</Row>
                </Container>
            </div>
        );
    }
}

export default Cart;
