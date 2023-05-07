import React, { Component } from "react";
import ProductDetails from "./ProductDetails";

/**
 * Supplies.js is the componen t component that displays pet supplies and their details.
 *
 * @extends React.Component
 * @example
 * return (
 *   <Supplies addToCart={addToCart} />
 * )
 *
 * @param {Object} props - Component props
 * @param {function} props.addToCart - Function to add a product to cart
 * @extends React.Component
 * @returns {JSX.Element} - Rendered component
 */
class Supplies extends Component {

  /**
  * Creates an instance of Supplies.
  * @constructor
  */
  constructor(props) {
    super(props);

    /**
    * @property {Object} state - Component state
    * @property {Array<Object>} state.allSupplies - list of all pet supplies fetched from API
    * @property {string} state.type - selected type of pet supply
    * @property {boolean} state.chosen - selection state of a pet supply
    * @property {Object} state.supply - pet supply object that is currently selected
    * @property {boolean} state.isLoading - loading state of the component
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
      const response = await fetch("https://p-u-backend-only.onrender.com/api/suppliesData");
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
    // prevent the code from continuing until allSupplies is set
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
  * @returns {Array<string>} distinct types of pet supplies
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
  * Creates an array of indexes of supplies that match the type of supplies selected.
  * @function handleDisplay
  * @memberof Supplies
  * @returns {Array} indexes of the pet supplies to be displayed
  */
  handleDisplay = () => {
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
          <div className="Container maxvp flexCenter">
            <div className="large">
              <div className="row centerText">
                {/* <h1 className="centerText">Supplies</h1> */}
                {arra.map((type) => {
                  const isSelected = this.state.type === type;
                  return (
                    <div className="col centerText">
                      <a onClick={() => this.handleChange(type)} value={type}>
                        <img
                          src={require(`./images/${type}.jpg`)}
                          className={isSelected ? "selected" : ""}
                          style={{ cursor: "pointer" }}
                        ></img>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="maxvp whitebg flexCenter">
              <div id="supDis" className="centerText flexCenter large" style={{ display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {good.map((type) => {
                  return (
                    <div style={{ padding: 0, margin: 0 }}>
                      <button
                        value={allSup[type]._id}
                        style={{ padding: 0, margin: 0 }}
                        onClick={() =>
                          this.setState({
                            chosen: !this.state.chosen,
                            supply: allSup[type],
                          })
                        }
                      >
                        <img
                          id={allSup[type]._id}
                          name={allSup[type].name}
                          alt={allSup[type].breed}
                          src={allSup[type].url}
                          style={{
                            height: "300px",
                            width: "300px",
                            objectFit: 'cover',
                          }}
                        ></img>
                      </button>
                      <h2 className="centerText">{allSup[type].name}</h2>
                      <h3 className="centerText">${allSup[type].price}</h3>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

export default Supplies;
