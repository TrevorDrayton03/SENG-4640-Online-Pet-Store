import React, { Component } from "react";
import ProductDetails from "./ProductDetails";

class Pets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPets: null,
      type: "Dog",
      chosen: false,
      goodAnimal: null,
      isLoading: true,
      maxRow: 0,
    };
  }

  handleChange = (event) => {
    this.setState({ type: event, maxRow: 0 });
  };

  handleToggleChosen() {
    this.setState({ chosen: !this.state.chosen });
  }

  // this has to be done instead of passing props down from App if we are going to make pets and pet types clickable from Home
  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:3000/api/petData");
      const pets = await response.json();
      this.setState({
        allPets: pets,
      });
    } catch (error) {
      console.error(error);
    }
    // this will check the URL for a query parameter and will set the state if it's there
    // this is how this component knows what to display when clicking on the pet icons or carousel in Home
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const type = params.get("type");
    const id = params.get("id");
    // prevent the code from continueing until allPets is set
    while (!this.state.allPets) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    if (id) {
      let pet = this.state.allPets.find((pets) => pets._id === id);
      this.setState({ goodAnimal: pet, chosen: true });
    } else if (type && !id) {
      this.setState({ type: type });
    }
    this.setState({ isLoading: false });
  }

  selectOptions() {
    let ani = this.state.allPets;
    let arra = [];
    let same = false;
    let count = 0;
    for (let i = 0; i < ani.length; i++) {
      for (let j = 0; j < arra.length; j++) {
        if (ani[i].type === arra[j]) {
          same = true;
        }
      }
      count++;
      if (count === 1 && same === false) {
        arra.push(ani[i].type);
      }
      same = false;
      count = 0;
    }
    return arra;
  }

  handleDisplay = () => {
    //meant to create a table that displays to page
    let allPets = this.state.allPets;
    const good = [];
    for (let anNum = 0; anNum < allPets.length; anNum++) {
      if (this.state.type === allPets[anNum].type) {
        good.push(anNum);
      }
    }
    return good;
  };

  render() {
    if (this.state.isLoading) {
      <div>
        <p>Loading...</p>
      </div>;
    } else if (this.state.allPets) {
      let allPets = this.state.allPets;
      let arra = this.selectOptions(); // this is an array of distinct pet types
      let good = this.handleDisplay(); // these are indexes of pets

      if (this.state.chosen === true) {
        return (
          <ProductDetails
            goodPet={this.state.goodAnimal}
            addToCart={this.props.addToCart}
            handleChosen={this.handleToggleChosen.bind(this)}
          />
        );
      } else {
        return (
          <div className="large">
            <div className="row centerText">
              <h1 className="centerText">Pets</h1>
              {arra.map((type) => {
                return (
                  <div className="col centerText">
                    <a value={type} onClick={() => this.handleChange(type)}>
                      <img src={require(`./images/${type}.jpg`).default}></img>
                    </a>
                  </div>
                );
              })}
            </div>
            <div id="petDis">
              <table>
                {this.state.maxrow < 3
                  ? good.map((type) => {
                      this.state.maxRow += 1;
                      console.log(this.state.maxRow);
                      return (
                        <td>
                          {" "}
                          <button
                            value={allPets[type]._id}
                            onClick={() =>
                              this.setState({
                                chosen: !this.state.chosen,
                                goodAnimal: allPets[type],
                              })
                            }
                          >
                            <img
                              className="itemImg"
                              id={allPets[type]._id}
                              name={allPets[type].name}
                              alt={allPets[type].breed}
                              src={allPets[type].url}
                              style={{
                                display: "block",
                                height: "300px",
                                width: "300px",
                              }}
                            ></img>
                          </button>
                          <h2>This is {allPets[type].name}</h2>
                          <h2 style={{ color: "red" }}>
                            $ {allPets[type].price}
                          </h2>
                        </td>
                      );
                    })
                  : <tr>sada</tr> && this.setState({ maxRow: 0 })}
              </table>
            </div>
          </div>
        );
      }
    }
  }
}

export default Pets;
