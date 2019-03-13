// ============= NODE PACKAGE IMPORTS =================
const express = require('express'); // Framework for writing server-side code
const bodyParser = require('body-parser');  // Allows for parsing of server requests and responses
const cors = require('cors'); // Import cors node package to resolve cross-origin issues

// ============= SERVER SETUP & STARTUP =================
const PORT = 3000;  // Defines port number for server to listen to
const app = express();  // Instantiates app as an express object
const api = require('./routes/api'); // Imports api.js
app.use(cors());  // Allows for cross origin resource access
app.use(bodyParser.json()); // Specifies body-parser to handle json files
app.use('/api', api); // Uses api route for REST services
app.listen( PORT,function(){
  console.log('Server runing on localhost:' + PORT);
});

// ============= REST SERVICES =================

// GET request at root
app.get('/', function(req, res){
  res.send('Hello from server');
});
