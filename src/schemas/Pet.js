var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://t00012088:t00012088@cluster0.kawr0qo.mongodb.net/test");

var Schema = mongoose.Schema;

var petsSchema = new Schema({
    type: { type: String, required: true },
    name: { type: String },
    breed: { type: String },
    age: { type: String },
    description: { type: String },
    url: { type: String },
    price: { type: String },
});

module.exports = mongoose.model("Pet", petsSchema);