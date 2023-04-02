import React, { Component } from 'react';
import CartItem from './CartItem.js';
import { Button } from 'react-bootstrap';
import CheckoutModal from "./modals/CheckoutModal";

/**
* Cart.js is the shopping cart component of the application.
* @example
* <Cart
*   items={cartItems}
*   total={total}
*   removeFromCart={removeFromCart}
*   removeFromTotal={removeFromTotal}
*   incrementTotal={incrementTotal}
*   decrementTotal={decrementTotal}
*   checkout={checkout}
* />
* @param {Object[]} items - Array of items in the cart.
* @param {number} total - Total cost of items in the cart.
* @param {Function} removeFromCart - Function to remove an item from the cart.
* @param {Function} removeFromTotal - Function to subtract an item's total cost (price * quantity) from the total.
* @param {Function} incrementTotal - Function to add an item's cost to the total.
* @param {Function} decrementTotal - Function to subtract an item's cost from the total.
* @param {Function} checkout - Function to check out items in the cart.
* @returns {JSX.Element}
* @extends React.Component
*/

class Cart extends Component {

    /**
    * Constructor for the Cart component.
    * @constructor
    * @property {Object} state - State of the component.
    * @property {boolean} state.showModal - True or false for showing the CheckoutModal component.
    */
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    /**
    * Handles closing the checkout modal.
    * 
    * @function
    */
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    /**
    * Renders the Cart component.
    * 
    * @function
    * @memberof Cart
    * @returns {JSX.Element}
    */
    render() {
        return (
            <div className="Container maxvp">
                <div className="cart Container">
                    <CheckoutModal
                        checkout={this.props.checkout}
                        show={this.state.showModal}
                        close={this.handleCloseModal}
                    >
                    </CheckoutModal>
                    {this.props.items.length === 0 ?
                        (<><h1 className="centerText">
                            Cart is Empty
                        </h1> <p>Why don't you try adding some items?</p></>)
                        : ''
                        // <h1 className="centerText"></h1>
                    }
                    <div style={{ justifyContent: "space-evenly", width: '100%' }}>
                        {this.props.items.length !== 0 && this.props.items.map((item) => (
                            <CartItem
                                id={item._id}
                                name={item.name}
                                url={item.url}
                                price={item.price}
                                type={item.type}
                                quantity={item.quantity}
                                removeFromCart={this.props.removeFromCart}
                                removeFromTotal={this.props.removeFromTotal}
                                incrementTotal={this.props.incrementTotal}
                                decrementTotal={this.props.decrementTotal}
                            >
                            </CartItem>
                        ))
                        }
                    </div>
                    <div className='row' style={{ alignItems: "baseline", justifyContent: 'space-between', width: '100%', paddingRight: '10px', paddingLeft: '20px' }}>
                        {this.props.items.length !== 0 &&
                            <div className='col' style={{ display: "flex", justifyContent: 'flex-start' }}>
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
                        }
                        {this.props.items.length !== 0 &&
                            <div className='col' style={{ display: "flex", alignItems: "center", justifyContent: 'flex-end' }}>
                                <p style={{ fontWeight: 'bold', margin: 0 }}>Total: ${parseFloat(this.props.total).toFixed(2)}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;
