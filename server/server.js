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
      pets = await PetModel.find(); // find all pets
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
    if (admin.length === 0) {
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

// get all unique pet types
app.get('/api/types', async (req, res) => {
  try {
    const types = await PetModel.distinct('type');
    res.status(200).json(types);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/delete', async (req, res) => {
  try {
    const key = req.query.key;
    await PetModel.deleteOne({ _id: key });
    res.status(200).send("delete success")
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.use('/api/update', async (req, res) => {
  try {
    const { key, name, age, type, breed, description, url, price } = req.body;
    const update = {
      name: name,
      age: age,
      type: type,
      breed: breed,
      description: description,
      url: url,
      price: price
    }
    await PetModel.findOneAndUpdate({ _id: key }, update);
    let updatedPet = await PetModel.findOne({ _id: key })
    res.status(200).send(updatedPet)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.use('/api/save', async (req, res) => {
  try {
    const { name, age, type, breed, description, url, price } = req.body;
    const newPetData = new PetModel({
      name: name,
      age: age,
      type: type,
      breed: breed,
      description: description,
      url: url,
      price: price
    });

    let newPet = await PetModel.create(newPetData)
    res.status(200).send(newPet)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});