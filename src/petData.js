import React, { Component } from "react";

class PetData extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   goodPet: this.props.goodPet,
    // };
  }

  handleDisp(e) {
    if (this.props.goodPet != undefined) {
      let pet = this.props.goodPet;
      return (
        <div className="large">
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
                  className="itemImg"
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
                  <h1>
                    All a little bit about them: <br></br>
                    {pet.description}
                  </h1>
                </tr>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  id="backToPets"
                  onClick={() => this.props.handleChosen()}
                >
                  {" "}
                  Back to Pets Page
                </button>
              </td>
              <td>
                <button
                  id="addToCart"
                  onClick={() => {
                    this.props.addToCart(pet);
                    this.props.handleChosen();
                  }}
                >
                  {" "}
                  Click here to add them to your cart
                </button>
              </td>
            </tr>
          </table>
        </div>
      );
    }
  }

  render() {
    return <div>{this.handleDisp()}</div>;
  }
}
export default PetData;
