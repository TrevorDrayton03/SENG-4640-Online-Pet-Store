const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));

app.set("view engine", "ejs");

var PetModel = require("../src/schemas/Pet.js");
var AdminModel = require("../src/schemas/Admin.js");

app.get('/api/petData', async (req, res) => {
  try {
    const type = req.query.type; // url query parameter
    let pets;
    if (type) {
      pets = await PetModel.find({ type: type }); // find pets of a certain type
    } else {
      pets = await PetModel.find(); // find all pets
    }
    res.send(pets);
  } catch (err) {
    res.status(500).send(err);
  };
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});