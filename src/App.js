import React, { Component } from 'react';
import Lists from './Lists.js';
import AddList from './AddList.js';
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

  handleAddList(s) {
    let newList = [...this.state.lists, s];
    let newItems = { ...this.state.items, [s]: [] };
    this.setState({ lists: newList, items: newItems })
  }

  handleAddItem(s) {
    let newItem = this.state.items;
    let key1 = Object.keys(s)
    key1 = JSON.stringify(key1)
    key1 = key1.replace(/[\[\]"]/g, "");
    newItem[key1].push(s[key1])
    this.setState({ items: newItem })
  }

  render() {
    return (
      <div className="App">
        <Navbar linkClick={this.handleLinkClick.bind(this)}></Navbar>
        {/* <h1>{this.state.message ? this.state.message : 'Loading...'}</h1>
        <AddList addList={this.handleAddList.bind(this)} />
        <div id="listsDiv" className="List">
          <Lists lists={this.state.lists} items={this.state.items} addItem={this.handleAddItem.bind(this)} />
        </div> */}
        {this.state.route === '/' && <Home />}
        {this.state.route === '/pets' && <Pets lists={this.state.lists} items={this.state.items} />}
      </div>
    );
  }

}

export default App;
