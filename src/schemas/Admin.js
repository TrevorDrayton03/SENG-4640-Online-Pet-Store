var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://t00012088:t00012088@cluster0.kawr0qo.mongodb.net/test");

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Admin", userSchema);