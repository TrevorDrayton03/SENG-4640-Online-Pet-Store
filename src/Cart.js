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

    handleIncrementPrice = (price) => {
        let newPrice = this.state.total + price
        this.setState({ total: newPrice })
    }

    handleDecrementPrice = (price) => {
        let newPrice = this.state.total - price
        this.setState({ total: newPrice })
    }

    render() {
        // let total = null
        // this.props.items && this.props.items.filter((item) => {
        //     const temp = parseFloat(item.price)
        //     if (!isNaN(temp))
        //         return (
        //             total += temp
        //         )
        // })

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
                            Empty Cart
                        </h1> <p>Why don't you try adding some items?</p></>) : <h1 className="centerText">
                            Cart
                        </h1>
                    }
                    <div style={{ justifyContent: "space-evenly", width: '100%' }}>
                        {this.props.items.length !== 0 && this.props.items.map((item) => (
                            <CartItem
                                id={item._id}
                                name={item.name}
                                url={item.url}
                                price={item.price}
                                type={item.type}
                                removeFromCart={this.props.removeFromCart}
                                incrementPrice={this.handleIncrementPrice.bind(this)}
                                decrementPrice={this.handleDecrementPrice.bind(this)}
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
                                <p style={{ fontWeight: 'bold', margin: 0 }}>Total: ${this.state.total.toFixed(2)}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;
