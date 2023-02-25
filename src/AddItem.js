import React, { Component } from 'react';

class AddItem extends Component {

  constructor() {
    super();
    this.state = { input: '' };
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = { [this.props.idName]: { name: this.state.input } }
    this.props.addItem(newItem);
  }

  handleOnChange(e) {
    e.preventDefault();
    this.setState({ input: e.target.value })
  }

  render() {
    var divName = 'add' + this.props.idName;
    return (
      <div className='addItemDiv'>
        <h4>Add {this.props.idName}</h4>
        <form ref='form' onSubmit={this.handleSubmit.bind(this)} onChange={this.handleOnChange.bind(this)}>
          <div id={divName} ref={divName}>
            <label>Name</label><br />
            <input type='text' ref='id' />
          </div>
          <br />
          <input type='submit' value='Submit' />
          <br />
        </form>
      </div>
    );
  }

}

export default AddItem;
