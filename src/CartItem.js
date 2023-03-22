import React, { Component } from 'react';

class CartItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='row'>
                {/* <div className="col">
                    <h2>{this.props.name}</h2>
                </div> */}
                <div className="col">
                    <img
                        className="cartImg"
                        alt="Item"
                        src={this.props.url}
                    />
                </div>
                <div className="col">
                    <p>Name: {this.props.name}</p>
                    <p>Breed: {this.props.breed}</p>
                    <p>Age: {this.props.age}</p>
                    <p>Price: ${this.props.price}</p>
                </div>
            </div>
        );
    }
}

export default CartItem;
