import React, { Component } from 'react';
import CartItem from './CartItem.js';
import { Button } from 'react-bootstrap';
import CheckoutModal from "./modals/CheckoutModal";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            showModal: false
        }
        // calculates the total (if the price is listed)
        // won't work until data is passed as a prop
        this.props.items && this.props.items.forEach(item => {
            const price = parseFloat(item.price);
            if (!isNaN(price)) {
                this.state.total += price;
            }
        });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        let total = null
        this.props.items && this.props.items.filter((item) => {
            const temp = parseFloat(item.price)
            if (!isNaN(temp))
                return (
                    total += temp
                )
        })

        return (
            <div className="Container blackBorder cart">
                <CheckoutModal
                    checkout={this.props.checkout}
                    show={this.state.showModal}
                    close={this.handleCloseModal}
                >
                </CheckoutModal>
                <h3 className="centerText">
                    Cart
                </h3>
                <div style={{ justifyContent: "space-evenly" }}>
                    {this.props.items.length === 0 && <p>Cart is empty.</p>}
                    {this.props.items.length !== 0 && this.props.items.map((item) => (
                        <CartItem
                            id={item._id}
                            name={item.name}
                            url={item.url}
                            price={item.price}
                            removeFromCart={this.props.removeFromCart}
                        >
                        </CartItem>
                    ))
                    }
                </div>
                <div>
                    {this.props.items.length !== 0 && <p>Total: ${total}</p>}
                    <Button
                        onClick={() => {
                            if (this.props.items.length !== 0) {
                                this.setState({ showModal: true })
                            }
                            else {
                                window.alert("Cart is empty.")
                            }
                        }}
                        variant="primary"
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        );
    }
}

export default Cart;
