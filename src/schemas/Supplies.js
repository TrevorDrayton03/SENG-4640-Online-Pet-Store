/**
* Mongoose model for the Supply schema.
* @module SuppliesModel
*/
const mongoose = require("mongoose");

/**
* Connects to MongoDB Atlas.
* @function
* @memberof module:SuppliesModel
* @returns {void}
*/
mongoose.connect("mongodb+srv://t00012088:t00012088@cluster0.kawr0qo.mongodb.net/test");

/**
* Represents the Supplies schema.
* @constructor
* @memberof module:SuppliesModel
* @param {string} type - The type of the supply (required).
* @param {string} name - The name of the supply.
* @param {string} url - The url to the supply image.
* @param {string} price - The price of the supply.
* @param {string} description - The description of the supply.
* @param {string} dimension - The physicl dimensions of the supply.
* @param {string} weight - The weight of the supply.
* @throws {Error} Will throw an error if required fields are missing.
*/
const suppliesSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String },
    url: { type: String },
    price: { type: String },
    description: { type: String },
    dimension: { type: String },
    weight: { type: String },
});

/**
* Exports the Supply Mongoose model.
* @memberof module:SuppliesModel
*/
module.exports = mongoose.model("Supplies", suppliesSchema);