import React, { Component } from "react";
import petData from './petData';

class Pets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      petType: this.props.petType,
      value: "Dog",
      chosen: false,
      display: false
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  selectOptions(){
  var select = document.getElementById("petType");
  let ani = this.state.petType;
  let arra = [];
  let same = false;
  let count = 0;
  for (let i = 0; i < ani.length; i++) {
    for (let j = 0; j < arra.length; j++) {
          if ( ani[i].type == arra[j] ) {
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
  arra.map((type) => {
    return (
        <option value={type}> {type} </option>
    )
  })
  console.log(arra); //code above is trying to find all unique types in array of petType
  }

  handleDisplay = () =>{ //meant to create a table that displays to page
    let cute = this.state.petType;
    console.log("test");

    const imgStyle = {display: 'block', height: '50%', width: '50%', flex: 1};
      
    for(let a = 0; a < cute.length; a++ ){
      if(this.state.value == cute[a].type){
        return(
          <table>
            <tr>
              <th>
                <h1>Their name is {cute[a].name}</h1>
              </th>
            </tr>
            <tr>
              <td>
                <img style = {imgStyle} id = {cute[a]._id} name = {cute[a].name} alt = {cute[a].breed} src = {cute[a].url} >
                </img>
              </td>
              <td>
                <h1>They cost $ {cute[a].price}</h1>
              </td>
            </tr>
          </table>
        );
      }
      console.log("as");
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
      if(this.state.display){
        return(
          <div>
            {this.handleDisplay()}
            <div className="Pets">
              {this.selectOptions()}
              <form onSubmit={this.state.display = true}>
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
            </div>
          </div>
          
        );
      }
      return (
        <div className="Pets">
          {this.selectOptions()}
          <form onSubmit={this.state.display = true}>
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