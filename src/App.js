import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Home from './Home.js';
import Pets from './Pets.js';
import Admin from './Admin.js';

import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      route: window.location.pathname,
      lists: [],
      items: {},
      message: null,
      admin: false,
      allPets: {}
    };
  }

  async componentDidMount() {
    FileSystemDirectoryEntry
    window.addEventListener('popstate', () => {
      this.setState({ route: window.location.pathname });
    });

    // home fetches all pets for the slide show of randomized pets
    // it gets all pets by *not* specifying a pet type
    // see server.js app.get('/api/petData')
    try {
      const response = await fetch('http://localhost:3000/api/petData');
      const pets = await response.json();
      this.setState({
        allPets: pets
      });
      console.log(this.state.allPets);
    } catch (error) {
      console.error(error);
    }
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
        {this.state.route === '/admin' && <Admin />}
      </div>
    );
  }

}

export default App;
