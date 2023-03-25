var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://t00012088:t00012088@cluster0.kawr0qo.mongodb.net/test");

var Schema = mongoose.Schema;

var petsuppliesSchema = new Schema({
    type: { type: String, required: true },
    name: { type: String },
    url: { type: String },
    price: { type: String },
    description: { type: String },
    dimensions: { type: String },
    weight: { type: String },
});

module.exports = mongoose.model("PetSupplies", petsuppliesSchema);