var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://t00012088:t00012088@cluster0.kawr0qo.mongodb.net/test");

var Schema = mongoose.Schema;

var petsSchema = new Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },

});

module.exports = mongoose.model("Pet", petsSchema);