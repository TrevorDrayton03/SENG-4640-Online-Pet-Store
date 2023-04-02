import React, { Component } from "react";

/**
* ProductDetails.js is a component that renders the details of a product, including its name, image, price, description, and options to add to cart or go back to pets.
* @returns {JSX.Element} - The ProductDetails component.
* @param {Object} props - Component props
* @param {object} props.goodPet - The product to display.
* @param {function} props.handleChosen - Callback function to handle clicking the back button.
* @param {function} props.addToCart - Callback function to handle adding the product to cart.
* @example
* <ProductDetails
*   goodPet={this.state.goodAnimal}
*   addToCart={this.props.addToCart}
*   handleChosen={this.handleToggleChosen.bind(this)}
* />
* @extends React.Component
* @returns {JSX.Element}
*/
class ProductDetails extends Component {

  /**
  * @function
  * @returns {JSX.Element} JSX element.
  */
  render() {
    let product = this.props.goodPet;
    if (product.breed !== undefined) {
      return (
        <div className="large" style={{ marginTop: '20px', flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <div className="col flexCenter centerText">
            <img
              id={product._id}
              name={product.name}
              alt={product.breed}
              src={product.url}
              className="productDetailsImg"
            ></img>
          </div>
          <div className="row" style={{ marginLeft: '20px', marginRight: '100px', }}>
            <div className="col">
              <div className="row">
                <h2>Name: <h3>{product.name}</h3></h2>
              </div>
              <div className="row">
                <h2>Breed: <h3>{product.breed}</h3></h2>
              </div>
              <div className="row">
                <h2>Age: <h3>{product.age}</h3></h2>
              </div>
              <div className="row">
                <h2>Description: <h3>{product.description}</h3></h2>
              </div>
              <div className="row">
                <h2>Price: <h3>${product.price}</h3></h2>
              </div>
            </div>
          </div>
          <div className="col">
            <button
              style={{ display: "block", width: '120px' }}
              id="addToCart"
              className="btn btn-primary"
              onClick={() => {
                this.props.addToCart(product);
                this.props.handleChosen();
              }}
            >
              {" "}
              Add to Cart
            </button>
            <button
              style={{ display: "block", width: '120px' }}
              id="backToPets"
              className="btn btn-secondary"
              onClick={() => this.props.handleChosen()}
            >
              {" "}
              Back
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="large" style={{ marginTop: '20px', flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <div className="col flexCenter centerText">
            <img
              id={product._id}
              name={product.name}
              src={product.url}
              className="productDetailsImg"
            ></img>
          </div>
          <div className="row" style={{ marginLeft: '20px', marginRight: '100px', }}>
            <div className="col">
              <div className="row">
                <h2>Name: <h3>{product.name}</h3></h2>
              </div>
              <div className="row">
                <h2>Description: <h3>{product.description}</h3></h2>
              </div>
              <div className="row">
                <h2>Weight: <h3>{product.weight}</h3></h2>
              </div>
              <div className="row">
                <h2>Dimensions: <h3>{product.dimension}</h3></h2>
              </div>
              <div className="row">
                <h2>Price: <h3>${product.price}</h3></h2>
              </div>
            </div>
          </div>
          <div className="col">
            <button
              style={{ display: "block", width: '120px' }}
              id="addToCart"
              className="btn btn-primary"
              onClick={() => {
                this.props.addToCart(product);
                this.props.handleChosen();
              }}
            >
              {" "}
              Add to Cart
            </button>
            <button
              style={{ display: "block", width: '120px' }}
              id="backToPets"
              className="btn btn-secondary"
              onClick={() => this.props.handleChosen()}
            >
              {" "}
              Back
            </button>
          </div>
        </div>
      );
    }
  }
}
export default ProductDetails;
