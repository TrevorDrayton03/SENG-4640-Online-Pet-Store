import React, { Component } from "react";
// import Pets from "./Pets";

class PetData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodPet: this.props.goodPet,
      chosen: this.props.chosen
    };
  }

  handleDisp(e) {
    let pet = this.state.goodPet;
    return (
      <div>
        <table>
          <tr>
            <th>
              <h1>This is {pet.name}</h1>
              <br></br>
              <h1>
                They are a {pet.breed} and {pet.age} year(s) old
              </h1>
            </th>
          </tr>
          <tr>
            <td>
              <img
                style={{
                  display: "block",
                  height: "100%",
                  width: "100%",
                  flex: 1,
                }}
                id={pet._id}
                name={pet.name}
                alt={pet.breed}
                src={pet.url}
              ></img>
            </td>
            <td>
              <tr>
                <h1>They cost $ {pet.price}</h1>
                <br></br>
              </tr>
              <tr>
                <h1>All a little bit about them: <br></br>{pet.description}</h1>
              </tr>
            </td>
          </tr>
          <tr>
            <button id="addToCart"> Click here to add them to your cart</button>
          </tr>
        </table>
      </div>
    );
  }

  render() {
    console.log(this.state.chosen);
    return <div>{this.handleDisp()}</div>;
  }
}
export default PetData;
