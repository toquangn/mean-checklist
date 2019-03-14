// ============= NODE PACKAGE IMPORTS =================
const express = require('express'); // Importing express from node modules
const router = express.Router(); // Instantiating Router class to route web services from server.js to api.js
const mongoose = require('mongoose') // Importing mongoose from node modules
const db = require('../db-config'); // Importing locally stored db-config file

// ============= DATA MODEL IMPORT =================
const User = require('../models/user');
const Todo = require('../models/todo');

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

// Register service functionality:
//  - Parses and creates User model from request body
//  - Database verifies if username is available before sending error or saving to db
router.post('/register', (req, res) => {
  let userData = req.body;
  let tempUser = new User(userData);

  if (!tempUser.username){
    res.status(401).send('Empty usernames are invalid');
  } else  {
    User.findOne({ username: userData.username }, (err, user) => {
      if (user){
        res.status(401).send(`User \'${ user.username }\' already exists.`);
      } else {
          tempUser.save((err, registeredUser) => {
              if (err){
                console.log('REST API \'/register\' error: ', err);
              }
              res.status(200).send(registeredUser);
          });
      }
    });
  }


});

// Login service functionality:
//  - Parses and creates User model from request body
//  - Database validates username and password before responding with error or user information
router.post('/login', (req, res) => {
  let userData = req.body;
  let tempUser = new User(userData);

  User.findOne({ username: tempUser.username }, (err, user) => {
    if (!user){
      res.status(401).send('Invalid username');
    } else {
      if (user.password !== tempUser.password){
        res.status(401).send('Invalid password');
      } else {
        res.status(200).send(user);
      }
    }
  });
});

// GET user todos functionality:
//  - Creates query based on username provided
//  - Returns result of database query or error message if user cannot be found
router.get('/:username', (req, res) => {
  var query  = Todo.where({ username: req.params.username }); // req.params.username set by '/:username' (FROM URL)
  query.find(function (err, userInfo) {
        if (err){
          res.status(401).send('User not found: ' + err);
        } else {
          res.json(userInfo);
        }
  });
});

// Delete Todo item
router.delete('/todo/:id', (req, res) => {
  Todo.deleteOne({_id: req.params.id }, function(err,removed){
    if (err){
      console.log('REST API \'DELETE /todo/:id\' error: ', err);
      res.send(err);
    } else {
      res.json(removed);
    }
  });
});

module.exports = router;
