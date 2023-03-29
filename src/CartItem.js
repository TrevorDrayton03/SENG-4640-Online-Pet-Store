import React, { Component } from 'react';
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

class CartItem extends Component {

    constructor() {
        super()
        this.state = {
            quantity: 1,
            type: 'supply'
        }
        this.incrementQuantity = this.incrementQuantity.bind(this)
        this.decrementQuantity = this.decrementQuantity.bind(this)
    }

    incrementQuantity = () => {
        this.setState(prevState => {
            const newQuantity = prevState.quantity + 1;
            this.props.incrementPrice(parseFloat(this.props.price));
            return { quantity: newQuantity };
        });
    }

    decrementQuantity = () => {
        if (this.state.quantity > 1) {
            this.setState(prevState => {
                const newQuantity = prevState.quantity - 1;
                this.props.decrementPrice(parseFloat(this.props.price));
                return { quantity: newQuantity };
            });
        }
    }

    render() {
        const price = parseFloat(this.props.price);
        const newPrice = price * this.state.quantity;
        return (
            <div className="blackBorder Container whitebg" style={{ width: '100%', height: '100%' }}>
                <div className="row" style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                    <div className="col" style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                        <div className="row">
                            <div className="col" style={{ paddingLeft: '20px', paddingRight: '20px', justifyContent: 'flex-start' }}>
                                <img
                                    className="cartImg"
                                    alt="Item"
                                    src={this.props.url}
                                />
                            </div>
                            <div className="col" style={{ paddingTop: 0, paddingBottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div className="row">
                                    <strong style={{ padding: '0', fontSize: '20px' }}>{this.props.name}</strong>
                                </div>
                                {this.state.type === 'supply' &&
                                    <div className="row">
                                        <div className="row">
                                            <button
                                                onClick={() => this.incrementQuantity()}
                                                className="btn btn-success"
                                            >
                                                <AiOutlinePlus></AiOutlinePlus>
                                            </button>
                                            <div style={{ textAlign: 'center' }}><strong style={{ padding: 0 }}>{this.state.quantity}</strong></div>
                                            <button
                                                onClick={() => this.decrementQuantity()}
                                                className="btn btn-warning"
                                            >
                                                <AiOutlineMinus></AiOutlineMinus>
                                            </button>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                    <div className="col" style={{ width: '100%', height: '260px', justifyContent: 'space-between', display: 'flex' }}>
                        <div className="col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                            <div className="row" style={{ paddingRight: '15px', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => this.props.removeFromCart(this.props.id)}
                                    className="btn btn-danger"
                                    style={{ width: '30%' }}
                                >Remove</button>
                            </div>
                            <div className="row" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                <strong style={{ textAlign: 'right' }}>${newPrice}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default CartItem;
