import React, { Component } from "react";
import petData from './petData';

class Pets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      petType: this.props.petType,
      value: "Dog",
      chosen: false
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  selectOptions(){
  var select = document.getElementById("petType");
  let ani = this.state.petType;
  let arra = ["Dog","Cat"];
  let count = 0;
    for (let i=0; i<ani.length; i++)
    {
        var j;
        for (j=0; j<i; j++)
          if (ani[i] == ani[j])
              break;
        if (i == j)
          console.log(ani[i] + " ");
    }
        console.log(arra); //code above is trying to find all unique types in array of petType
  // for(let index in arra) {
  //     select.add(new Option(arra[index]));
  //     console.log(arra[index]);
  // }
  }

  handleDisplay = () =>{ //meant to create a table that displays to page
    let cute = this.state.petType;
    for(let a = 0; a < cute.length; a++ ){
      if(this.state.value == cute[a].type){
        return(
          <table>
            <tr>
              <th>
                Their name is {cute[a].name}
              </th>
            </tr>
            <tr>
              <td>
                <img style = "display: block;margin-left: auto; height: 50%;margin-right: auto;width: 50%;" id = {cute[a]._id} name = {cute[a].name} alt = {cute[a].breed} src = {cute[a].url} >
                </img>
              </td>
              <td>
                They cost $ {cute[a].price}
              </td>
            </tr>
          </table>
        );
      }
    }
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
    if(!this.state.chosen){
      return (
        <div className="Pets">
          {this.selectOptions()}
          <form onSubmit={this.handleDisplay.bind("petT")}>
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
          
          <div id="petT">
            {/* <table id="petsTy"></table> */}
          </div>
        </div>
      );
    }
    else{
      return(
        <petData/>
      )
    }
  }
}

export default Pets;