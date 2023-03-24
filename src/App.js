import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Home from './Home.js';
import Pets from './Pets.js';
import Admin from './Admin.js';
import Cart from './Cart.js';

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
      carouselData: null
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
        <Navbar linkClick={this.handleLinkClick.bind(this)}></Navbar>
        {this.state.route === '/' && <Home pets={this.state.carouselData} />}
        {this.state.route === '/pets' && <Pets addToCart={this.handleAddToCart.bind(this)} />}
        {this.state.route === '/admin' && <Admin handleLogin={this.handleLogin.bind(this)} admin={this.state.admin} />}
        {this.state.route === '/cart' && <Cart items={this.state.cartItems} removeFromCart={this.handleRemoveFromCart.bind(this)} />}
        {this.state.route === '/petsupplies' && <PetsSupplies addToCart={this.handleAddToCart.bind(this)}/>}
      </div>
    );
  }
}

export default App;
