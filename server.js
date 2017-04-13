//Server Setup
// =============================================================================
// Necessary packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
import Bear from ('./models/bear.js')

//Connect to database
if(process.env.NODE_ENV = "production"){
  mongoose.connect(process.env.MONGODB_URI)
}
else if (process.env.NODE_ENV = "test") {
  mongoose.connect('localhost:27017/bears-test')
}
else{
  mongoose.connect('localhost:27017/bears-development')
}

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

//Get all the Bears
router.get('/bears', function(req,res) {
  res.json({message: "Welcome to the api"});
});

//Create a Bears
router.get('/')

// Register the routes
// all of my routes will be prefixed with /api

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Server is running on port:" + port)
