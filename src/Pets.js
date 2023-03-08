import React, { Component } from 'react';
import Lists from './Lists.js';

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
        let key1 = Object.keys(s)
        key1 = JSON.stringify(key1)
        key1 = key1.replace(/[\[\]"]/g, "");
        newItem[key1].push(s[key1])
        this.setState({ items: newItem })
    }

    render() {
        return (
            <div className="Pets">
                <h1>This is Pets component</h1>
                <div id="listsDiv" className="List">
                    <Lists lists={this.state.lists} items={this.state.items} addItem={this.handleAddItem.bind(this)} />
                </div>
            </div>
        );
    }

}

export default Pets;
