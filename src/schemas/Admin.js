/**
* Mongoose model for the Admin user schema.
* @module AdminModel
*/
const mongoose = require("mongoose");

/**
* Connects to MongoDB Atlas.
* @function
* @memberof module:AdminModel
* @returns {void}
*/
mongoose.connect("mongodb+srv://t00012088:t00012088@cluster0.kawr0qo.mongodb.net/test");

/**
* Represents the Admin user schema.
* @constructor
* @memberof module:AdminModel
* @param {string} name - The name of the admin user.
* @param {string} password - The password of the admin user.
* @param {string} username - The username of the admin user.
* @throws {Error} Will throw an error if required fields are missing.
*/
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true }
});

/**
* Exports the Admin Mongoose model.
* @memberof module:AdminModel
*/
module.exports = mongoose.model("Admin", userSchema);