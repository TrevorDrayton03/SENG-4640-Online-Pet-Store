import React, { Component } from "react";

class Data extends Component {
  handleDisp(e) {
    let product = this.props.goodPet;
    if (product.breed != undefined) {
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
                    {product.description}
                  </h1>
                </tr>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  id="backToPets"
                  onClick={() => this.props.handleChosen()}
                >
                  {" "}
                  Back to Pets Page
                </button>
              </td>
              <td>
                <button
                  id="addToCart"
                  onClick={() => {
                    this.props.addToCart(product);
                    this.props.handleChosen();
                  }}
                >
                  {" "}
                  Click here to add them to your cart
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
                    {product.description}<br></br>
                    {product.dimension}<br></br>
                    {product.weight}
                  </h1>
                </tr>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  id="backToPets"
                  onClick={() => this.props.handleChosen()}
                >
                  {" "}
                  Back to Pet Supplies Page
                </button>
              </td>
              <td>
                <button
                  id="addToCart"
                  onClick={() => {
                    this.props.addToCart(product);
                    this.props.handleChosen();
                  }}
                >
                  {" "}
                  Click here to add this item to your cart
                </button>
              </td>
            </tr>
          </table>
        </div>
      );
    }
  }

  render() {
    return <div>{this.handleDisp()}</div>;
  }
}
export default Data;
