// ============= NODE PACKAGE IMPORTS =================
const express = require('express'); // Importing express from node modules
const router = express.Router(); // Instantiating Router class to route web services from server.js to api.js
const mongoose = require('mongoose') // Importing mongoose from node modules
const db = require('../db-config'); // Importing locally stored db-config file

// ============= DATA MODEL IMPORT =================
const User = require('../models/user');

// ============= DATABASE SETUP & ESTABLISH CONNECTION =================

// Uses credentials stored in config.js to access database
const uri = `mongodb+srv://${db.user}:${db.password}@checklistdb-pvvyv.mongodb.net/${db.database}?retryWrites=true`;

// Establishes connection to database based on uri
mongoose.connect(uri, {useNewUrlParser: true}, (err) => {
  if (err){
    console.log('Error establishing connection to MongoDB: ' + err);
  } else {
    console.log('Successfully connected to MongoDB...');
  }
});

// ============= REST SERVICES =================
router.post('/register', (req, res) => {
  let userData = req.body;
  let user = new User(userData);

  user.save((err, registeredUser) => {
      if (err){
        console.log('REST API \'/register\' error: ', err);
      } else {
        res.status(200).send(registeredUser);
      }
  });
});

module.exports = router;
