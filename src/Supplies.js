import React, { Component } from "react";
import ProductDetails from "./ProductDetails";

/**
 * React component that displays pet supplies and their details.
 *
 * @class
 * @component
 * @example
 * return (
 *   <Supplies addToCart={addToCart} />
 * )
 *
 * @param {Object} props - Component props
 * @param {function} props.addToCart - Function to add a product to cart
 *
 * @returns {JSX.Element} - Rendered component
 */
class Supplies extends Component {

  /**
  * Creates an instance of Supplies.
  *
  * @constructor
  * @param {Object} props - Component props
  */
  constructor(props) {
    super(props);

    /**
    * State object of the Supplies component
    * @property {Array|null} allSupplies - list of all pet supplies fetched from the API
    * @property {string} type - selected type of pet supply
    * @property {boolean} chosen - selection state of a pet supply
    * @property {object|null} supply - pet supply object that is currently selected
    * @property {boolean} isLoading - loading state of the component
    */
    this.state = {
      allSupplies: null,
      type: "Collar",
      chosen: false,
      supply: null,
      isLoading: true,
    };
  }

  /**
  *Handle changes in supply type
  *@memberof Supplies
  *@param {string} event - Selected type of pet supply
  */
  handleChange = (event) => {
    this.setState({ type: event });
  };

  /**
  * Toggle the selection state of pet supply
  * @memberof Supplies
  */
  handleToggleChosen() {
    this.setState({ chosen: !this.state.chosen });
  }

  /**
  * Fetches the list of pet supplies and sets the state
  * Checks the URL for query parameters and sets the state
  * @memberof Supplies
  * @async
  */
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
    // prevent the code from continueing until allSupplies is set
    while (!this.state.allSupplies) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    if (type) {
      this.setState({ type: type });
    }
    this.setState({ isLoading: false });
  }

  /**
  * Select distinct types of pet supplies
  * @memberof Supplies
  * @returns {Array} distinct types of pet supplies
  */
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

  /**
  * Select pet supplies of the chosen type
  * @memberof Supplies
  * @returns {Array} indexes of the pet supplies to be displayed
  */
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

  /**
  * Render Supplies Component
  * @memberof Supplies
  * @returns {JSX.Element} Supplies Component
  */
  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
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
                const isSelected = this.state.type === type;
                return (
                  <div className="col centerText">
                    <a onClick={() => this.handleChange(type)} value={type}>
                      <img
                        src={require(`./images/${type}.jpg`).default}
                        className={isSelected ? "selected" : ""}
                      ></img>
                    </a>
                  </div>
                );
              })}
            </div>
            <div id="petDis">
              {/* for each supplyToBeBought index type, use it to get the supplyToBeBought data we want from all the supplyWanted */}
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
