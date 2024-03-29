/**
 * This is the backend file for the Pet Universe app.
 * @module Controller 
 * @requires express
 * @requires path
 * @requires body-parser
 * @requires AdminModel
 * @requires SuppliesModel
 * @requires PetModel
 */

/**
 * express module
 * @const
 * @type {object}
 * @namespace routes
 */
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../build')));

// parse application/json (header content type)
app.use(bodyParser.json());

app.use(cors());

const PetModel = require("../schemas/Pet.js");
const SuppliesModel = require("../schemas/Supplies.js");
const AdminModel = require("../schemas/Admin.js");

/**
* This middleware always console logs the requests.
* @name LogRequests
* @function
* @memberof module:Controller~routes
* @inner
* @param {Object} req - The request object.
* @param {function} next - The next middleware in the chain.
*/
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

/**
 * GET endpoint to fetch all pet data. Fetches pets of a certain type if a type query parameter is included.
 * @name /api/petData
 * @function
 * @memberof module:Controller~routes
 * @inner
 * @param {Object} req - Pet type query parameter (not required).
 * @param {Object} res - All pets or pets of a type.
  */
app.get('/api/petData', async (req, res) => {
  try {
    const type = req.query.type;
    let pets;
    if (type) {
      pets = await PetModel.find({ type: type });
    } else {
      pets = await PetModel.find();
    }
    res.send(pets);
  } catch (err) {
    res.status(500).send(err);
  };
});

/**
 * GET endpoint to fetch all supplies data. Fetches supplies of a certain type if a type query parameter is included.
* @name /api/suppliesData
* @function
* @memberof module:Controller~routes
* @inner
 * @param {Object} req - Suppliles type query parameter (not required).
 * @param {Object} res - All supplies or supplies of a type.
*/
app.get('/api/suppliesData', async (req, res) => {
  try {
    const type = req.query.type;
    let supplies;
    if (type) {
      supplies = await SuppliesModel.find({ type: type });
    } else {
      supplies = await SuppliesModel.find();
    }
    res.send(supplies);
  } catch (err) {
    res.status(500).send(err);
  };
});

/**
* POST endpoint to authenticate an admin.
* @name /api/admin
* @function
* @memberof module:Controller~routes
* @inner
* @param {Object} req - Username and password from the request body.
* @param {Object} res - True or false (determines if logged in succeeded).
*/
app.post('/api/admin', async (req, res) => {
  try {
    const { username, password } = req.body;
    let admin = await AdminModel.findOne({ username: username, password: password });
    let logInAttempt;
    if (!admin) {
      logInAttempt = false;
    }
    else {
      logInAttempt = true;
    }
    res.json(logInAttempt);
  } catch (err) {
    res.status(500).send(err);
  };
});

/**
* GET endpoint to fetch all unique pet types.
* @name /api/petTypes
* @function
* @memberof module:Controller~routes
* @inner
* @param {Object} res - All unique pet types.
*/
app.get('/api/petTypes', async (req, res) => {
  try {
    const types = await PetModel.distinct('type');
    res.status(200).json(types);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
* GET endpoint to fetch all unique supply types.
* @name /api/supplyTypes
* @function
* @memberof module:Controller~routes
* @inner
* @param {Object} res - All unique supply types.
*/
app.get('/api/supplyTypes', async (req, res) => {
  try {
    const types = await SuppliesModel.distinct('type');
    res.status(200).json(types);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
* Route to delete a pet by id
* @name /api/deletePet
* @function
* @memberof module:Controller~routes
* @inner
* @param {Object} req - Pet _id.
* @param {Object} res - A string denoting success or error.
*/
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

/**
* Route to delete a supply by id
* @name /api/deleteSupply
* @function
* @memberof module:Controller~routes
* @inner
* @param {Object} req - Supply _id.
* @param {Object} res - A string denoting success or error.
*/
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

/**
* Route to checkout and remove multiple pets from the database by id
* @name /api/checkout
* @function
* @memberof module:Controller~routes
* @inner
* @param {Object} req - Keys (_id) of pets from the cart that need to be removed from the db when checked out.
* @param {Object} res - A string or success or error.
*/
app.use('/api/checkout', async (req, res) => {
  try {
    const keys = req.body;
    for (const key of keys) {
      await PetModel.findByIdAndDelete(key);
      // await SuppliesModel.findByIdAndDelete(key); // don't delete the supply from the db
    }
    res.status(200).send("checkout success")
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
* Route to update a pet by id
* @name /api/updatePet
* @function
* @memberof module:Controller~routes
* @inner
* @param {Object} req - Key, name, age, type, breed, description, url, and price of a pet in the body of the request.
* @param {Object} res - The updated pet.
*/
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

/**
* Route to update a supply by id
* @name /api/updateSupply
* @function
* @memberof module:Controller~routes
* @inner
* @param {Object} req - Key, name, dimension, type, weight, description, url, and price of a supply in the body of the request.
* @param {Object} res - The updated supply.
*/
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

/**
* Route to save a new pet to the database
* @name /api/savePet
* @function
* @memberof module:Controller~routes
* @inner
* @param {Object} req - The new pet to be saved to the DB.
* @param {Object} res - The new pet.
*/
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

/**
* Route to save a new supply to the database
* @name /api/saveSupply
* @function
* @memberof module:Controller~routes
* @inner
* @param {Object} req - The new supply to be saved to the DB.
* @param {Object} res - The new supply.
*/
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

/**
* Route to get a random set of pets for the carousel
* @name /api/git 
* @function
* @memberof module:Controller~routes
* @inner
* @param {Object} res - Three random pets.
*/
app.get('/api/carousel', async (req, res) => {
  PetModel.aggregate([{ $sample: { size: 3 } }])
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

/**
* Route to serve the index.html file for all unmatched routes
* @name *
* @function
* @memberof module:Controller~routes
* @inner
* @param {Object} res - The react front-end file for the user to interface with.
*/
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

/**
* Starts the server on port 3000 and logs to the console
* @name listener
* @function
* @memberof module:Controller~routes
* @inner
*/
app.listen(3000, () => {
  console.log('Listening');
});
