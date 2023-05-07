import React, { Component } from 'react';
import NavigationBar from './NavigationBar.js';
import Home from './Home.js';
import Pets from './Pets.js';
import Admin from './Admin.js';
import Cart from './Cart.js';
import Supplies from './Supplies.js';
import CustomerService from './CustomerService.js';

import './App.css';

/**
* App.js is the root component of the application. 
* @example
* <App/>
* @extends React.Component
* @returns {JSX.Element}
*/
class App extends Component {
  constructor() {
    super();
    /**
    * The initial state of the component.
    * @property {Object} state
    * @property {string} state.route - The current route/pathname of the application.
    * @property {boolean} state.admin - A boolean that indicates if the user is an admin or not.
    * @property {Object} state.allPets - An object that contains all pet data.
    * @property {Array} state.cartItems - An array that contains all items in the cart.
    * @property {Array} state.carouselData - An array that contains the data for the carousel on the home page.
    * @property {number} state.total - The total price of all items in the cart.
    */
    this.state = {
      route: window.location.pathname,
      admin: false,
      allPets: {},
      cartItems: [],
      // cartItems: [{
      //   _id: 1,
      //   name: 'Fluffy',
      //   breed: 'Persian',
      //   url: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
      //   price: '25.00',
      //   type: "Dog"
      // },
      // {
      //   _id: 2,
      //   name: 'Buddy',
      //   breed: 'Golden Retriever',
      //   url: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg',
      //   price: '25.00',
      //   type: "Dog"
      // },
      // {
      //   _id: 3,
      //   name: 'Lola',
      //   breed: 'Siamese',
      //   url: 'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg',
      //   price: '25.00',
      //   type: "Collar"
      // }],
      carouselData: null,
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
      total: 0,
    };
  }

  /**
  * Called immediately after the component is mounted.
  * Registers a popstate event listener to update the current route on back/forward navigation.
  * Retrieves data from API endpoints and sets the component state accordingly.
  * @async
  * @returns {void}
  */
  async componentDidMount() {
    window.addEventListener('popstate', () => {
      this.setState({ route: window.location.pathname });
    });

    try {
      const response = await fetch('https://pet-universe.onrender.com/api/petData');
      const pets = await response.json();
      this.setState({
        allPets: pets,
      });
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await fetch('https://pet-universe.onrender.com/api/suppliesData');
      const supplies = await response.json();
      this.setState({
        allSupplies: supplies,
      });
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await fetch('https://pet-universe.onrender.com/api/carousel');
      const carouselPets = await response.json();
      this.setState({
        carouselData: carouselPets
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
  * Handles adding an item to the cart.
  * If the item is not already in the cart, it is added with a quantity of 1.
  * Updates the component state with the new cart items and total price.
  * @param {Object} item - The item to be added to the cart.
  * @returns {void}
  */
  handleAddToCart(item) {
    let itemInCart = this.state.cartItems.find(cartItem => cartItem._id === item._id);
    if (!itemInCart) {
      const updatedCart = [...this.state.cartItems];
      itemInCart = { ...item, quantity: 1 }; // add quantity to cartItem
      updatedCart.push(itemInCart);
      this.setState({ cartItems: updatedCart });
    }
    this.setState({ total: this.state.total += parseFloat(item.price) })
  }

  /**
  * Handles removing an item from the cart.
  * Updates the component state with the new cart items.
  * @param {ObjectId} key - The _id of the item to be removed from the cart.
  * @returns {void}
  */
  handleRemoveFromCart(key) {
    const updatedCart = this.state.cartItems.filter(data => data._id !== key);
    this.setState({ cartItems: updatedCart });
  }

  /**
  * Async function that handles the checkout process of the items in the cart.
  * @async
  */
  async handleCheckoutCart() {
    const keys = this.state.cartItems.map((obj => obj._id));
    await fetch('https://pet-universe.onrender.com/api/checkout', {
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

  /**
  * Function that handles removing the price of an item from the total price.
  * @param {number} price - The price of the item to remove.
  * @param {number} quantity - The quantity of the item to remove.
  */
  handleRemoveFromTotal = (price, quantity) => {
    let updatedTotal = this.state.total - price * quantity;
    this.setState({ total: updatedTotal });
  }

  /**
  * Function that handles incrementing the quantity of an item and updating the total price.
  * @param {number} price - The price of the item to increment.
  * @param {ObjectId} key - The unique identifier of the item to increment.
  */
  handleIncrementTotal = (price, key) => {
    const updatedCart = this.state.cartItems.map((cartItem) => {
      if (cartItem._id === key) {
        return {
          ...cartItem, quantity: cartItem.quantity + 1
        }
      } else {
        return cartItem;
      }
    })
    this.setState({ cartItems: updatedCart })

    let newTotal = Number(this.state.total) + price
    this.setState({ total: newTotal })
  }

  /**
  * Function that handles decrementing the quantity of an item and updating the total price.
  * @param {number} price - The price of the item to decrement.
  * @param {ObjectId} key - The unique identifier of the item to decrement.
  */
  handleDecrementTotal = (price, key) => {
    const currentCart = this.state.cartItems
    const updatedCart = this.state.cartItems.map((cartItem) => {
      if (cartItem._id === key && cartItem.quantity > 1) {
        return {
          ...cartItem, quantity: cartItem.quantity - 1
        }
      } else {
        return cartItem;
      }
    })
    this.setState({ cartItems: updatedCart })

    const cartItem = currentCart.find((item) => item._id === key);
    if (cartItem && cartItem.quantity > 1) {
      const newTotal = Number(this.state.total) - price;
      this.setState({ total: newTotal });
    }
  }

  /**
  * Function that handles changing the current route and updating the browser's history.
  * @param {string} route - The new route to navigate to.
  */
  handleLinkClick(route) {
    this.setState({ route });
    window.history.pushState(null, null, route);
  }

  /**
  * Function that handles setting the logged-in state of the admin user.
  * @param {boolean} loggedIn - The new logged-in state of the admin user.
  */
  handleLogin(loggedIn) {
    this.setState({ admin: loggedIn });
  }

  /**
  * Determines whether the component should re-render or not based on changes in props and state.
  * @param {object} nextProps - The next set of props that the component will receive.
  * @param {object} nextState - The next state of the component.
  * @returns {boolean} - Returns false if there are no changes, true if there are changes.
  */
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props === nextProps && this.state === nextState) {
      return false;
    }
    return true;
  }

  /**
  * Renders the main application component.
  * @memberof App
  * @returns {JSX.Element} - Returns a JSX element that represents the application component.
  */
  render() {
    return (
      <div className="App">
        <NavigationBar
          linkClick={this.handleLinkClick.bind(this)}
          itemCount={this.state.cartItems.length}
          route={this.state.route}
        />
        {this.state.route === '/' && <Home pets={this.state.carouselData} />}
        {this.state.route === '/pets' && <Pets addToCart={this.handleAddToCart.bind(this)} />}
        {this.state.route === '/admin' && <Admin handleLogin={this.handleLogin.bind(this)} admin={this.state.admin} />}
        {this.state.route === '/cart' &&
          <Cart
            items={this.state.cartItems}
            removeFromCart={this.handleRemoveFromCart.bind(this)}
            removeFromTotal={this.handleRemoveFromTotal.bind(this)}
            incrementTotal={this.handleIncrementTotal.bind(this)}
            decrementTotal={this.handleDecrementTotal.bind(this)}
            checkout={this.handleCheckoutCart.bind(this)}
            total={this.state.total}
          />}
        {this.state.route === '/supplies' && <Supplies addToCart={this.handleAddToCart.bind(this)} />}
        {this.state.route === '/customer%20service' && <CustomerService />}
      </div>
    );
  }
}

export default App;
