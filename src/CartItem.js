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

    async componentDidMount() {
        await fetch('http://localhost:3000/api/petTypes')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(this.props.type);
                console.log(data.includes(this.props.type));
                if (data.includes(this.props.type)) {
                    this.setState({ type: 'pet' });
                }
                else {
                    this.setState({ type: 'supply' });
                }
            })
            .catch(error => console.log(error))
    }
    render() {
        const price = parseFloat(this.props.price);
        const newPrice = price * this.state.quantity;
        return (
            <div className="blackBorder Container whitebg" style={{ width: '100%', height: '100%', paddingTop: 0, marginTop: 0 }}>
                <div className="row" style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                    {/* the first column */}
                    <div className="col" style={{ width: '100%', height: '100%', justifyContent: 'center', flexGrow: 2 }}>
                        <div className="row">
                            <div className="col" style={{ paddingLeft: '20px', paddingRight: '20px', justifyContent: 'flex-start' }}>
                                <img
                                    className="cartImg"
                                    alt="Item"
                                    src={this.props.url}
                                />
                            </div>
                            <div className="col" style={{ paddingTop: 0, paddingBottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div className="row">
                                    <strong style={{ padding: '0', fontSize: '20px' }}>{this.props.name}</strong>
                                </div>
                                {
                                    <div className="row" style={{ alignItems: 'baseline' }}>
                                        <div className="col noPad" >
                                            <button
                                                onClick={() => this.decrementQuantity()}
                                                className="btn btn-warning noPad"
                                                style={{ textAlign: 'center', width: '40px', height: '40px' }}
                                            >
                                                <AiOutlineMinus></AiOutlineMinus>
                                            </button>
                                        </div>
                                        <div className="col noPad" style={{ textAlign: 'center', alignSelf: 'baseline' }}>
                                            <strong style={{ padding: '10px', }}>{this.state.quantity}</strong>
                                        </div>
                                        <div className="col noPad" style={{ paddingLeft: 0, justifyContent: 'center', alignItems: 'center' }}>
                                            <button
                                                onClick={() => this.incrementQuantity()}
                                                className="btn btn-success noPad"
                                                style={{ textAlign: 'center', width: '40px', height: '40px' }}
                                            >
                                                <AiOutlinePlus></AiOutlinePlus>
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    {/* the second column */}
                    <div className="col" style={{ width: '100%', height: '260px', justifyContent: 'space-between', display: 'flex' }}>
                        <div className="col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                            <div className="row" style={{ paddingRight: '15px', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => {
                                        this.props.removeFromCart(this.props.id)
                                        this.props.removeFromTotal(this.props.price, this.state.quantity)
                                    }}
                                    className="btn btn-danger"
                                    style={{ width: '40%' }}
                                >Remove</button>
                            </div>
                            <div className="row" style={{ paddingLeft: '20px', paddingRight: '10px' }}>
                                <strong style={{ textAlign: 'right' }}>${newPrice.toFixed(2)}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default CartItem;
