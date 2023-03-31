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
        <div className="large">
          <table>
            <tr>
              <th>
                <h1>This is {product.name}</h1>
                <br></br>
                <h1>
                  They are a {product.breed} and {product.age} year(s) old
                </h1>
              </th>
            </tr>
            <tr>
              <td>
                <img
                  className="itemImg"
                  id={product._id}
                  name={product.name}
                  alt={product.breed}
                  src={product.url}
                ></img>
              </td>
              <td>
                <tr>
                  <h1>They cost $ {product.price}</h1>
                  <br></br>
                </tr>
                <tr>
                  <h1>
                    A little bit about them: <br></br>
                  </h1>
                  <h4>
                    {product.description}
                  </h4>
                </tr>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  id="backToPets"
                  className="btn btn-secondary"
                  onClick={() => this.props.handleChosen()}
                >
                  {" "}
                  Back
                </button>
              </td>
              <td>
                <button
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
              </td>
            </tr>
          </table>
        </div>
      );
    } else {
      return (
        <div className="large">
          <table>
            <tr>
              <th>
                <h1>This is a {product.name}</h1>
              </th>
            </tr>

            <tr>
              <td>
                <img
                  className="itemImg"
                  id={product._id}
                  name={product.name}
                  src={product.url}
                ></img>
              </td>
              <td>
                <tr>
                  <h1>It costs $ {product.price}</h1>
                  <br></br>
                </tr>
                <tr>
                  <h1>
                    A little bit about the product: <br></br>
                  </h1>
                  <h4>
                    {product.description}
                    <br></br>
                    {product.dimension}
                    <br></br>
                    {product.weight}
                  </h4>
                </tr>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  id="backToPets"
                  className="btn btn-secondary"
                  onClick={() => this.props.handleChosen()}
                >
                  {" "}
                  Back
                </button>
              </td>
              <td>
                <button
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
              </td>
            </tr>
          </table>
        </div>
      );
    }
  }
}
export default ProductDetails;
