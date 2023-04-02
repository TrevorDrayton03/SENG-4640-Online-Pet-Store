import React, { Component } from "react";
import ProductDetails from "./ProductDetails";

/**
 * Pets.js is the component that displays pets and pet details when a pet is clicked on.
 * @example
 * <Pets addToCart={addToCart} />
 * @param {Object} props - Component props
 * @param {Object} props.addToCart - Function to add pet to cart
 * @extends React.Component
 * @returns {JSX.Element} - Rendered component
 */

class Pets extends Component {

  /**
  * Creates an instance of Pets.
  * @constructor
  */
  constructor(props) {
    super(props);

    /**
    * Component state
    * @property {Object} state - Component state
    * @property {Array<Object>} state.allPets - List of all available pets fetched from API
    * @property {string} state.type - Current type of pet to display
    * @property {boolean} state.chosen - Whether a pet has been chosen for details view
    * @property {Object} state.goodAnimal - Selected pet for details view
    * @property {boolean} state.isLoading - Whether the component is still loading data
    */
    this.state = {
      allPets: null,
      type: "Dog",
      chosen: false,
      goodAnimal: null,
      // goodAnimal: {
      //   _id: 1,
      //   name: 'Fluffy',
      //   breed: 'Persian',
      //   url: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
      //   price: '25.00',
      //   type: "Dog",
      //   age: 0.5,
      //   description: "The name says it all. The name says it all. The name says it all. The name says it all. The name says it all."
      // },             // for testing
      // chosen: true,  // for testing
      // allPets: true, // for testing
      isLoading: true,
    };
  }

  /**
  * Handles changes in the pet type to display.
  *
  * @method
  * @param {string} event - New pet type
  * @returns {void}
  */
  handleChange = (event) => {
    this.setState({ type: event });
  };

  /**
  * Toggles the chosen state between true and false.
  * 
  * Used to determine whether the details view should be mounted or dismounted.
  * @method
  * @returns {void}
  */
  handleToggleChosen() {
    this.setState({ chosen: !this.state.chosen });
  }

  /**
  * Fetches pet data and updates component state.
  * 
  * Sets goodAnimal if query parameters exist in the URL.
  *
  * @async
  * @method
  * @returns {Promise<void>}
  */
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

  /**
  * Generates an array of distinct pet types from allPets.
  * @method
  * @returns {Array<string>} - Array of distinct pet types
  */
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

  /**
  * Creates an array of indexes of pets that match the type of pet selected.
  * @function handleDisplay
  * @memberof Pets
  * @description Creates an array of indexes of pets that match the type of pet selected.
  * @returns {Array} good - Array of indexes of pets that match the selected type.
  */
  handleDisplay = () => {
    let allPets = this.state.allPets;
    const good = [];
    for (let anNum = 0; anNum < allPets.length; anNum++) {
      if (this.state.type === allPets[anNum].type) {
        good.push(anNum);
      }
    }
    return good;
  };

  /**
  * Renders the Pets component.
  * @memberof Pets
  * @returns {JSX.Element} JSX element.
  */
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
          <div className="Container maxvp flexCenter">
            <div className="large">
              <div className="row centerText">
                {/* <h1 className="centerText">Pets</h1> */}
                {arra.map((type) => {
                  const isSelected = this.state.type === type;
                  return (
                    <div className="col centerText">
                      <a value={type} onClick={() => this.handleChange(type)}>
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
              <div id="petDis" className="centerText flexCenter large" style={{ display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {
                  good.map((type) => {
                    return (
                      <div>
                        <button
                          value={allPets[type]._id}
                          style={{ padding: 0, margin: 0 }}
                          onClick={() =>
                            this.setState({
                              chosen: !this.state.chosen,
                              goodAnimal: allPets[type],
                            })
                          }
                        >
                          <img
                            id={allPets[type]._id}
                            name={allPets[type].name}
                            alt={allPets[type].breed}
                            src={allPets[type].url}
                            style={{
                              height: "300px",
                              width: "300px",
                              objectFit: 'cover'
                            }}
                          ></img>
                        </button>
                        <h2 className="centerText">{allPets[type].name}</h2>
                        <h3 className="centerText">${allPets[type].price}</h3>
                      </div>
                    );
                  })
                }
              </div >
            </div >
          </div >);
      }
    }
  }
}

export default Pets;
