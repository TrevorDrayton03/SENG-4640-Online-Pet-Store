/**
* Mongoose model for the Pet schema.
* @module PetModel
*/
const mongoose = require("mongoose");

/**
* Connects to MongoDB Atlas.
* @function
* @memberof module:PetModel
* @returns {void}
*/
mongoose.connect("mongodb+srv://t00012088:t00012088@cluster0.kawr0qo.mongodb.net/test");

/**
* Represents the Pets schema.
* @constructor
* @memberof module:PetModel
* @param {string} type - The type of the pet (required).
* @param {string} name - The name of the pet.
* @param {string} breed - The breed of the pet.
* @param {string} age - The age of the pet.
* @param {string} description - The description of the pet.
* @param {string} url - The url to the pet image.
* @param {string} price - The price of the pet.
* @throws {Error} Will throw an error if required fields are missing.
*/
const petsSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String },
    breed: { type: String },
    age: { type: String },
    description: { type: String },
    url: { type: String },
    price: { type: String },
});

/**
* Exports the Pet Mongoose model.
* @memberof module:PetModel
*/
module.exports = mongoose.model("Pet", petsSchema);