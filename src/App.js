import React, { Component } from 'react';
import NavigationBar from './NavigationBar.js';
import Home from './Home.js';
import Pets from './Pets.js';
import Admin from './Admin.js';
import Cart from './Cart.js';
import PetSupplies from './PetSupplies.js';

import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      route: window.location.pathname,
      lists: [],
      items: {},
      admin: false,
      allPets: {},
      cartItems: [],
      // cartItems: [{
      //   _id: 1,
      //   name: 'Fluffy',
      //   breed: 'Persian',
      //   url: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
      //   price: '25.00',
      //   type:"Dog"
      // },
      // {
      //   _id: 2,
      //   name: 'Buddy',
      //   breed: 'Golden Retriever',
      //   url: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg',
      //   price: '25.00',
      //   type:"Dog"
      // },
      // {
      //   _id: 3,
      //   name: 'Lola',
      //   breed: 'Siamese',
      //   url: 'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg',
      //   price: '25.00',
      //   type:"Collar"
      // }],
      // carouselData: null,
      // carouselData: [{
      //   _id: 1,
      //   name: 'Fluffy',
      //   breed: 'Persian',
      //   url: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*'
      // },
      // {
      //   _id: 2,
      //   name: 'Buddy',
      //   breed: 'Golden Retriever',
      //   url: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg'
      // },
      // {
      //   _id: 3,
      //   name: 'Lola',
      //   breed: 'Siamese',
      //   url: 'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg'
      // }],
    };
  }

  async componentDidMount() {
    window.addEventListener('popstate', () => {
      this.setState({ route: window.location.pathname });
    });

    try {
      const response = await fetch('http://localhost:3000/api/petData');
      const pets = await response.json();
      this.setState({
        allPets: pets,
      });
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await fetch('http://localhost:3000/api/suppliesData');
      const supplies = await response.json();
      this.setState({
        allSupplies: supplies,
      });
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await fetch('http://localhost:3000/api/carousel');
      const carouselPets = await response.json();
      this.setState({
        carouselData: carouselPets
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleAddToCart(item) {
    let itemInCart = this.state.cartItems.find(cartItem => cartItem._id === item._id);
    if (!itemInCart) {
      const updatedCart = [...this.state.cartItems];
      updatedCart.push(item);
      this.setState({ cartItems: updatedCart });
    }
  }

  handleRemoveFromCart(key) {
    const updatedCart = this.state.cartItems.filter(data => data._id !== key);
    this.setState({ cartItems: updatedCart });
  }

  async handleCheckoutCart() {
    const keys = this.state.cartItems.map((obj => obj._id));
    await fetch('http://localhost:3000/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(keys)
    })
      .then(response => response.json())
      .catch(error => console.log(error))
    this.setState({ cartItems: [] });
  }

  handleLinkClick(route) {
    this.setState({ route });
    window.history.pushState(null, null, route);
  }

  handleLogin(loggedIn) {
    this.setState({ admin: loggedIn });
  }
  shouldComponentUpdate(nextProps, nextState) {
    // compare current props and state with next props and state
    if (this.props === nextProps && this.state === nextState) {
      // no changes, don't re-render
      return false;
    }
    // changes, re-render
    return true;
  }
  render() {
    return (
      <div className="App">
        <NavigationBar linkClick={this.handleLinkClick.bind(this)} itemCount={this.state.cartItems.length}></NavigationBar>
        {this.state.route === '/' && <Home pets={this.state.carouselData} />}
        {this.state.route === '/pets' && <Pets addToCart={this.handleAddToCart.bind(this)} />}
        {this.state.route === '/admin' && <Admin handleLogin={this.handleLogin.bind(this)} admin={this.state.admin} />}
        {this.state.route === '/cart' && <Cart items={this.state.cartItems} removeFromCart={this.handleRemoveFromCart.bind(this)} checkout={this.handleCheckoutCart.bind(this)} />}
        {this.state.route === '/petsupplies' && <PetSupplies addToCart={this.handleAddToCart.bind(this)} />}
      </div>
    );
  }
}

export default App;
