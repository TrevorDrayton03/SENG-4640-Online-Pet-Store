import React, { Component } from 'react';
import Lists from './Lists.js';
import AddList from './AddList.js';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      lists: [],
      items: {}
    };
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
        <AddList addList={this.handleAddList.bind(this)} />
        <div id="listsDiv" className="List">
          <Lists lists={this.state.lists} items={this.state.items} addItem={this.handleAddItem.bind(this)} />
        </div>
      </div>
    );
  }

}

export default App;
