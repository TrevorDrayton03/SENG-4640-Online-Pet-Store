import React, { Component } from "react";
import PetData from "./PetData";

class Pets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      petType: null,
      value: "Dog",
      chosen: false,
      goodAnimal: 0
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleToggleChosen() {
    this.setState({ chosen: !this.state.chosen });
  }

  // this has to be done instead of passing props down from App if we are going to make pets and pet types clickable from Home
  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:3000/api/petData');
      const pets = await response.json();
      this.setState({
        petType: pets,
      });
    } catch (error) {
      console.error(error);
    }
  }

  selectOptions() {
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

  render() {
    if (this.state.petType) {
      let cute = this.state.petType;
      let arra = this.selectOptions();
      let good = this.handleDisplay();

      if (this.state.chosen === true) {
        return <PetData
          goodPet={this.state.petType[this.state.goodAnimal]}
          petType={this.state.petType}
          addToCart={this.props.addToCart}
          handleChosen={this.handleToggleChosen.bind(this)}
        />;
      }
      else {
        return (
          <div className="large">
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
                          className="itemImg"
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
                      <button value={cute[type]} onClick={() => this.setState({ chosen: !this.state.chosen, goodAnimal: type })}>
                        Click here to learn more about them
                      </button>
                    </tr>
                  </table>
                );
              })}
            </div>
          </div>
        );
      }
    }
  }
}

export default Pets;
