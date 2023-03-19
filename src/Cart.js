import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CartItem from './CartItem.js';


// https://react-bootstrap.github.io/layout/grid/
// https://codesandbox.io/s/react-bootstrap-shopping-cart-example-3ym4j?file=/src/index.js:509-518

// cart needs to be able to have multiple items (pets, supplies) which can be added or removed from the cart
// supplies need a quantity which can be edited in the cart
// cart needs to sum the total price of each item
// cart needs to have a checkout process
// add to cart option for pet details and supplies details 
// cart needs to remove the pet from the database upon checkout
// cart needs to handle the cartItems state from the main app

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            total: 0
        }
        this.state.items.forEach(item => {
            const price = parseFloat(item.price);
            if (!isNaN(price)) {
                this.state.total += price;
            }
        });
    }


    render() {
        return (
            <div className="Cart">
                <Container style={{ alignItems: "center", justifyContent: "center" }}>
                    <Row>
                        {this.state.items.map((item) => (
                            <CartItem
                                id={item._id}
                                name={item.name}
                                url={item.url}
                                price={item.price}
                            >
                            </CartItem>
                        ))}
                    </Row>
                    <Row xs lg="2">
                        <p className="d-flex justify-content-end">Total: ${this.state.total.toFixed(2)}</p>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Cart;
