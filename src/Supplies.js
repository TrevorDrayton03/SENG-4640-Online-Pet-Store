import React, { Component } from "react";
import ProductDetails from "./ProductDetails";

class Supplies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSupplies: null,
      type: "Collar",
      chosen: false,
      supply: null,
      isLoading: true,
    };
  }

  handleChange = (event) => {
    this.setState({ type: event });
  };
  handleToggleChosen() {
    this.setState({ chosen: !this.state.chosen });
  }

  // this has to be done instead of passing props down from App if we are going to make supplyWanted and supplyToBeBought types clickable from Home
  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:3000/api/suppliesData");
      const petsupplies = await response.json();
      this.setState({
        allSupplies: petsupplies,
      });
    } catch (error) {
      console.error(error);
    }
    // this will check the URL for a query parameter and will set the state if it's there
    // this is how this component knows what to display when clicking on the supplyToBeBought icons or carousel in Home
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const type = params.get("type");
    // const id = params.get('id');
    // console.log(id);
    // prevent the code from continueing until allSupplies is set
    while (!this.state.allSupplies) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    // if (id) {
    //   let supplyToBeBought = this.state.allSupplies.find(petsupplies => petsupplies._id ==== id)
    //   console.log(supplyToBeBought)
    //   this.setState({ supply: supplyToBeBought, chosen: true });
    // }
    if (type) {
      this.setState({ type: type });
    }
    this.setState({ isLoading: false });
  }

  selectOptions() {
    let sup = this.state.allSupplies;
    let arra = [];
    let same = false;
    let count = 0;
    for (let i = 0; i < sup.length; i++) {
      for (let j = 0; j < arra.length; j++) {
        if (sup[i].type === arra[j]) {
          same = true;
        }
      }
      count++;
      if (count === 1 && same === false) {
        arra.push(sup[i].type);
      }
      same = false;
      count = 0;
    }
    return arra;
  }

  handleDisplay = () => {
    //meant to create a table that displays to page
    let allSup = this.state.allSupplies;
    const good = [];
    for (let anNum = 0; anNum < allSup.length; anNum++) {
      if (this.state.type === allSup[anNum].type) {
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
    } else if (this.state.allSupplies) {
      let allSup = this.state.allSupplies;
      let arra = this.selectOptions(); // this is an array of distinct supplyToBeBought types
      let good = this.handleDisplay(); // these are indexes of supplyWanted

      if (this.state.chosen === true) {
        return (
          <ProductDetails
            goodPet={this.state.supply}
            addToCart={this.props.addToCart}
            handleChosen={this.handleToggleChosen.bind(this)}
          />
        );
      } else {
        return (
          <div className="large">
            <div className="row centerText">
              <h1 className="centerText">Supplies</h1>
              {arra.map((type) => {
                return (
                  <div className="col centerText">
                    <a onClick={() => this.handleChange(type)} value={type}>
                      <img src={require(`./images/${type}.jpg`).default}></img>
                    </a>
                  </div>
                );
              })}
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
                        <h1>{allSup[type].name} </h1>{" "}
                      </th>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        <button
                          value={allSup[type]._id}
                          onClick={() =>
                            this.setState({
                              chosen: !this.state.chosen,
                              supply: allSup[type],
                            })
                          }
                        >
                          <img
                            className="itemImg"
                            id={allSup[type]._id}
                            name={allSup[type].name}
                            alt={allSup[type].breed}
                            src={allSup[type].url}
                            style={{
                              display: "block",
                              height: "100%",
                              width: "100%",
                            }}
                          ></img>
                        </button>
                      </td>
                      <td>
                        <h1>${allSup[type].price}</h1>
                      </td>
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

export default Supplies;
