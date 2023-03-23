import React, { Component } from "react";
import petData from "./petData";

class Pets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      petType: this.props.petType,
      value: "Dog",
      chosen: false,
      display: false,
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  selectOptions() {
    var select = document.getElementById("petType");
    let ani = this.state.petType;
    let arra = [];
    let same = false;
    let count = 0;
    for (let i = 0; i < ani.length; i++) {
      for (let j = 0; j < arra.length; j++) {
        if (ani[i].type == arra[j]) {
          same = true;
        }
      }
      count++;
      if (count == 1 && same == false) {
        arra.push(ani[i].type);
      }
      same = false;
      count = 0;
    }
    console.log(arra); //code above is trying to find all unique types in array of petType
  }

  handleDisplay = (e) => {
    //meant to create a table that displays to page
    let cute = this.state.petType;
    const imgStyle = { display: "block", height: "50%", width: "50%", flex: 1 };
    for (let i = 0; i < cute.length; i++) {
      if (this.state.value == cute[i].type) {
        document.getElementById("petsTy").innerHTML +=
          "<table>" +
          "<tr>" +
          "<th>" +
          "<h3> Their name is " +
          cute[i].name +
          "</h3>" +
          "</th>" +
          "</tr>" +
          "<tr>" +
          "<td>" +
          '<img style = "display: block;margin-left: auto; height: 50%;margin-right: auto;width: 50%;" ' +
          "name = " +
          cute[i].name +
          " alt =" +
          cute[i].breed +
          " src =" +
          cute[i].url +
          ">" +
          "</td>" +
          "<td>" +
          "<h3> They cost $" +
          cute[i].price +
          "</h3>" +
          "</td>" +
          "</tr>" +
          "</table>";
      }
    }
  };

  render() {
    if (!this.state.chosen) {
      if (this.state.display) {
        return (
          <div>
            <div className="Pets">
              {this.selectOptions()}
              <form onSubmit={(this.handleDisplay)}>
                <h2>What animals would you like to look at?</h2>
                <select
                  name="animals"
                  id="petType"
                  value={this.state.value}
                  onChange={this.handleChange.bind(this)}
                >
                  <option value="Dog">Dogs</option>
                  <option value="Cat">Cats</option>
                  <option value="Fish">Fish</option>
                  <option value="Bird">Birds</option>
                </select>
                <input type="submit" value="Submit"></input>
              </form>
              <table id="petsTy"></table>
            </div>
          </div>
        );
      }
      return (
        <div className="Pets">
          {this.selectOptions()}
          <form onSubmit={(this.state.display = true, this.handleDisplay)}>
            <h2>What animals would you like to look at?</h2>
            <select
              name="animals"
              id="petType"
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            >
              <option value="Dog">Dogs</option>
              <option value="Cat">Cats</option>
              <option value="Fish">Fish</option>
              <option value="Bird">Birds</option>
            </select>
            <input type="submit" value="Submit"></input>
          </form>
          <table id="petsTy"></table>
        </div>
      );
    } else {
      return <petData />;
    }
  }
}

export default Pets;
