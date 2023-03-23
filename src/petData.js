import React, { Component } from "react";
import Pets from "./Pets";

class petData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodPet: this.props.goodPet,
    };
  }

  handleDisp(e){
    let pet = this.state.goodPet;
    return(
        <div>
            <table>
            <tr>
              <th>
                This is {pet.name}
                They are a {pet.breed} and {pet.age} year(s) old
              </th>
            </tr>
            <tr>
              <td>
                <img style = "display: block;margin-left: auto; height: 50%;margin-right: auto;width: 50%;" id = {pet._id} name = {pet.name} alt = {pet.breed} src = {pet.url} >
                </img>
              </td>
              <td>
                <tr>
                They cost $ {pet.price}
                </tr>
                <tr>
                    {pet.description}
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

  render(){
    console.log("POG");
    return(
      <div>
      {this.handleDisp()}
      </div>
    );
  }
}
export default petData;