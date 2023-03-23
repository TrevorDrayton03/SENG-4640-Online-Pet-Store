import React, { Component } from "react";
import petData from "./petData";

class Pets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      petType: this.props.petType,
      value: "Dog",
      chosen: false,
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
    return arra;
    // arra.map((type) => {
    //   document.getElementById("petType").innerHTML = "<option value=" + { type } + ">" + { type } + "</option>";
    // });
    console.log(arra); //code above is trying to find all unique types in array of petType
  }

  handleDisplay = () => {
    //meant to create a table that displays to page
    let cute = this.state.petType;
    const good = [];
    for (let anNum = 0; anNum < cute.length; anNum++) {
      if (this.state.value == cute[anNum].type) {
        good.push(anNum);
      }
    }
    return good;
  };

  // handlePetType(event) {
  //   let animal = this.props.petType;
  //   document.getElementById("petsTy").innerHTML = '';
  //   for (let i = 0; i < animal.length; i++) {
  //     if (animal[i].type == this.state.value) {
  //       document.getElementById("petsTy").innerHTML += '<tr>' + '<th>' + '<h3> Their name is ' + animal[i].name + '</h3>' + '</th>' + '</tr>'
  //         + '<tr>' + '<td>' + '<img style = "display: block;margin-left: auto; height: 50%;margin-right: auto;width: 50%;" '
  //         + 'name = ' + animal[i].name + ' alt =' + animal[i].breed + ' src ='
  //         + animal[i].url + '>' + '</td>'
  //         + '<td>' + '<h3> They cost $' + animal[i].price + '</h3>' + '</td>'+ '</tr>';
  //       console.log(i);
  //     }
  //   }
  //   event.preventDefault();
  // }

  render() {
    let cute = this.state.petType;
    let arra = this.selectOptions();
    let good = this.handleDisplay();
    const imgStyle = { display: "block", height: "50%", width: "50%", flex: 1 };

    if (!this.state.chosen) {
      return (
        <div>
          <div className="Pets">
            <h2>What animals would you like to look at?</h2>
            <select
              name="animals"
              id="petType"
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            >
              {arra.map((type) => {
                return <option value={type}>{type}</option>;
              })}
            </select>
          </div>
          <div id="petDis">
            {good.map((type) => {
              return (
                <table>
                  {" "}
                  <tr>
                    {" "}
                    <th>
                      {" "}
                      <h1>Their name is {cute[type].name} </h1>{" "}
                    </th>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <img
                        style={imgStyle}
                        id={cute[type]._id}
                        name={cute[type].name}
                        alt={cute[type].breed}
                        src={cute[type].url}
                      ></img>
                    </td>
                    <td>
                      <h1>They cost $ {cute[type].price}</h1>
                    </td>
                  </tr>
                  <tr>
                    <button value={cute[type]}>
                      Click here to learn more about them
                    </button>
                  </tr>
                </table>
              );
            })}
          </div>
        </div>
      );
    } else {
      return <div><petData /></div>;
    }
  }
}

export default Pets;
