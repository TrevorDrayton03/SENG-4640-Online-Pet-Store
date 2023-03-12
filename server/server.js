const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json (header content type)
app.use(bodyParser.json());

const PetModel = require("../src/schemas/Pet.js");
const AdminModel = require("../src/schemas/Admin.js");

app.get('/api/petData', async (req, res) => {
  try {
    const type = req.query.type;
    let pets;
    if (type) {
      pets = await PetModel.find({ type: type }); // find pets of a certain type
    } else {
      pets = await PetModel.findAll(); // find all pets
    }
    res.send(pets);
  } catch (err) {
    res.status(500).send(err);
  };
});

app.use('/api/admin', async (req, res) => {
  try {
    const { username, password } = req.body;
    let admin = await AdminModel.findOne({ username: username, password: password }); // find pets of a certain type
    let logInAttempt;
    if (!admin) {
      logInAttempt = false;
    }
    else {
      logInAttempt = true;
    }
    res.send(logInAttempt);
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