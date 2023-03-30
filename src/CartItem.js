import React, { Component } from 'react';
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

class CartItem extends Component {
    constructor() {
        super()
        this.state = {
            type: null
        }
    }

    async componentDidMount() {
        await fetch('http://localhost:3000/api/petTypes')
            .then(response => response.json())
            .then(data => {
                if (data.includes(this.props.type)) {
                    this.setState({ type: 'pet' });
                }
                else {
                    this.setState({ type: 'supply' });
                }
            })
            .catch(error => console.log(error))
    }

    // this is required because otherwise when a cartItem is removed it inherits
    // the type of the cartItem that used to hold its position
    async componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            await fetch('http://localhost:3000/api/petTypes')
                .then(response => response.json())
                .then(data => {
                    if (data.includes(this.props.type)) {
                        this.setState({ type: 'pet' });
                    }
                    else {
                        this.setState({ type: 'supply' });
                    }
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        const price = parseFloat(this.props.price);
        const newPrice = price * this.props.quantity;
        if (this.state.type) {
            console.log(this.state.type)
            return (
                <div key={this.props.id} className="blackBorder Container whitebg" style={{ width: '100%', height: '100%', paddingTop: 0, marginTop: 0 }}>
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
                                    {this.state.type && this.state.type === 'supply' &&
                                        <div className="row" style={{ alignItems: 'baseline' }}>
                                            <div className="col noPad" >
                                                <button
                                                    onClick={() => this.props.decrementTotal(parseFloat(this.props.price), this.props.id)}
                                                    className="btn btn-warning noPad"
                                                    style={{ textAlign: 'center', width: '40px', height: '40px' }}
                                                >
                                                    <AiOutlineMinus></AiOutlineMinus>
                                                </button>
                                            </div>
                                            <div className="col noPad" style={{ textAlign: 'center', alignSelf: 'baseline' }}>
                                                <strong style={{ padding: '10px', }}>{this.props.quantity}</strong>
                                            </div>
                                            <div className="col noPad" style={{ paddingLeft: 0, justifyContent: 'center', alignItems: 'center' }}>
                                                <button
                                                    onClick={() => this.props.incrementTotal(parseFloat(this.props.price), this.props.id)}
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
                                            this.props.removeFromTotal(this.props.price, this.props.quantity)
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
}

export default CartItem;
