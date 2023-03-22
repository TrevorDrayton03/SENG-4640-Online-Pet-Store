import React, { Component } from 'react';
import CartItem from './CartItem.js';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // items: this.props.items,
            items: null,
            total: 0
        }
        // calculates the total (if the price is listed)
        // won't work until data is passed as a prop
        this.state.items && this.state.items.forEach(item => {
            const price = parseFloat(item.price);
            if (!isNaN(price)) {
                this.state.total += price;
            }
        });
    }

    // temp using this just to get data to the cart
    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:3000/api/carousel');
            const carouselPets = await response.json();
            this.setState({
                items: carouselPets
            });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div className="Container blackBorder cart">
                {this.state.items && this.state.items.map((item) => (
                    <CartItem
                        id={item._id}
                        name={item.name}
                        url={item.url}
                        price={item.price}
                    >
                    </CartItem>
                ))}
            </div>
        );
    }
}

export default Cart;
