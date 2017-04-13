//Server Setup
// =============================================================================
// Necessary packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Connect to database
mongoose.connect('')

// how to configure app to use bodyParser()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// Define Routes
// =============================================================================
const router = express.Router();

router.get('/', function(req,res) {
  res.json({message: "Welcome to the api"});
});

// Register the routes
// all of my routes will be prefixed with /api

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Server is running on port:" + port)
