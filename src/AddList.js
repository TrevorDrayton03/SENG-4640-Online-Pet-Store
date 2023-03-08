import React, { Component } from 'react';

class AddList extends Component {
  constructor() {
    super();
    this.state = { input: '' };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addList(this.state.input)
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ input: e.target.value });
  }

  render() {
    return (
      <div id="addListDiv">
        <form onSubmit={this.handleSubmit.bind(this)} onChange={this.handleChange.bind(this)}>
          <div id='addList'>
            <label>What will be on your next list?&nbsp;
              <input type='text' ref='id' id='newID'></input>
            </label>
          </div><br />
          <input type='submit' value='Create List' />
        </form>
      </div >
    );
  }
}

export default AddList;
