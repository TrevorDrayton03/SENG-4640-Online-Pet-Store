const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));

app.set("view engine", "ejs");

// parse application/json (header content type)
app.use(bodyParser.json());

const PetModel = require("../src/schemas/Pet.js");
const SuppliesModel = require("../src/schemas/PetSupplies.js");
const AdminModel = require("../src/schemas/Admin.js");

// this middleware always console logs the requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

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

app.get('/api/suppliesData', async (req, res) => {
  try {
    const type = req.query.type;
    let supplies;
    if (type) {
      supplies = await SuppliesModel.find({ type: type }); // find supplies of a certain type
    } else {
      supplies = await SuppliesModel.find(); // find all supplies
    }
    res.send(supplies);
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
app.get('/api/petTypes', async (req, res) => {
  try {
    const types = await PetModel.distinct('type');
    res.status(200).json(types);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// get all unique supply types
app.get('/api/supplyTypes', async (req, res) => {
  try {
    const types = await SuppliesModel.distinct('type');
    res.status(200).json(types);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/deletePet', async (req, res) => {
  try {
    const key = req.query.key;
    await PetModel.deleteOne({ _id: key });
    res.status(200).send("delete success")
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/deleteSupply', async (req, res) => {
  try {
    const key = req.query.key;
    await SuppliesModel.deleteOne({ _id: key });
    res.status(200).send("delete success")
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.use('/api/checkout', async (req, res) => {
  try {
    const keys = req.body;
    for (const key of keys) {
      await PetModel.findByIdAndDelete(key);
      await SuppliesModel.findByIdAndDelete(key);
    }
    res.status(200).send("checkout success")
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.use('/api/updatePet', async (req, res) => {
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

app.use('/api/updateSupply', async (req, res) => {
  try {
    const { key, name, dimension, type, weight, description, url, price } = req.body;
    const update = {
      name: name,
      dimension: dimension,
      type: type,
      weight: weight,
      description: description,
      url: url,
      price: price
    }
    await SuppliesModel.findOneAndUpdate({ _id: key }, update);
    let updatedSupply = await SuppliesModel.findOne({ _id: key })
    res.status(200).send(updatedSupply)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// saves pet to 
app.use('/api/savePet', async (req, res) => {
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

app.use('/api/saveSupply', async (req, res) => {
  try {
    const { name, weight, type, dimension, description, url, price } = req.body;
    const newSupplyData = new SuppliesModel({
      name: name,
      weight: weight,
      type: type,
      dimension: dimension,
      description: description,
      url: url,
      price: price
    });

    let newSupply = await SuppliesModel.create(newSupplyData)
    res.status(200).send(newSupply)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// get random pets for carousel using an ES6 style of synax
app.get('/api/carousel', async (req, res) => {
  PetModel.aggregate([{ $sample: { size: 3 } }])
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});