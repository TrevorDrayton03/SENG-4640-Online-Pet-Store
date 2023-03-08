import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Home from './Home.js';
import Pets from './Pets.js';

import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      route: window.location.pathname,
      lists: [],
      items: {},
      message: null
    };
  }

  componentDidMount() {
    window.addEventListener('popstate', () => {
      this.setState({ route: window.location.pathname });
    });

    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(data => this.setState({
        message: data.message,
        lists: data.lists,
        items: data.items
      }));
  }

  handleLinkClick(route) {
    this.setState({ route });
    window.history.pushState(null, null, route);
  }

  render() {
    return (
      <div className="App">
        <Navbar linkClick={this.handleLinkClick.bind(this)}></Navbar>
        {this.state.route === '/' && <Home />}
        {this.state.route === '/pets' && <Pets lists={this.state.lists} items={this.state.items} />}
      </div>
    );
  }

}

export default App;
