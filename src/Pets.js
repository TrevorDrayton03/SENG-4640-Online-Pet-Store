import React, { Component } from "react";
import Lists from "./Lists.js";

class Pets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: props.lists,
      items: props.items,
    };
  }

  handleAddItem(s) {
    let newItem = this.state.items;
    let key1 = Object.keys(s);
    key1 = JSON.stringify(key1);
    key1 = key1.replace(/[\[\]"]/g, "");
    newItem[key1].push(s[key1]);
    this.setState({ items: newItem });
  }

  render() {
    return (
      <div className="Pets">
        <h1>This is Pets component</h1>
        <form>
          <h2>What animals would you like to look at?</h2>
          <select name="animals" id="petType">
            <option value="Dog">Dogs</option>
            <option value="Cat">Cats</option>
            <option value="Fish">Fish</option>
            <option value="Bird">Birds</option>
          </select>
          <input type="submit" value="Submit"></input>
        </form>
        <script>
            let pType = document.getElementById("petType");
        </script>
        <div id="listsDiv" className="List">
          <Lists
            lists={this.state.lists}
            items={this.state.items}
            addItem={this.handleAddItem.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Pets;
