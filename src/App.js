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
      cartItems: {},
      petType: {},
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
        petType: pets
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

  handleLinkClick(route) {
    this.setState({ route });
    window.history.pushState(null, null, route);
  }

  handleLogin(loggedIn) {
    this.setState({ admin: loggedIn });
  }

  handleRemoveFromCart(key) {
    console.log(this.state.cartItems)
    const updatedCart = this.state.cartItems.filter(data => data._id !== key);
    this.setState({ cartItems: updatedCart });
    console.log(this.state.cartItems)
  }

  render() {
    return (
      <div className="App">
        <Navbar linkClick={this.handleLinkClick.bind(this)}></Navbar>
        {this.state.route === '/' && <Home pets={this.state.carouselData} />}
        {this.state.route === '/pets' && <Pets petType={this.state.petType} />}
        {this.state.route === '/admin' && <Admin handleLogin={this.handleLogin.bind(this)} admin={this.state.admin} />}
        {this.state.route === '/cart' && <Cart items={this.state.cartItems} removeFromCart={this.handleRemoveFromCart.bind(this)} />}
      </div>
    );
  }
}

export default App;
