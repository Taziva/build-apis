//Server Setup
// =============================================================================
// Necessary packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Bear = require('./models/bear.js')

//Connect to database

mongoose.connect('mongodb://localhost:27017/bears-development')


// how to configure app to use bodyParser()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// Define Routes
// =============================================================================
const router = express.Router();

// middleware to use for all requests
router.use(function(req,res,next){
  console.log("Request has been made");
  next(); // make sure we go to the next routes and don't stop here
})

router.get('/', function(req,res) {
  res.json({message: "Welcome to the api"});
});

//Get all the Bears
router.get('/bears', function(req,res) {
  Bear.find({},function(err, docs){
    if(err) res.send(err)
    res.json(docs)
  })
});

//Create a Bears
router.post('/bears', function(req,res) {
  var bear = new Bear();
  bear.name = req.body.name;
  bear.save(function(err){
    if(err){
      res.send(err);
    }
    res.json({message: "Bear created"})
  });
});

//Get a single Bear
router.get('/bears/:bear_id', function(req, res) {
  var bearID = req.params.bear_id;
  Bear.findById(bearID, function(err, bear) {
    if(err) res.send(err);
    res.json(bear)
  });
});

//Update a single Bear
router.put('/bears/:bear_id', function(req,res){
  var bearID = req.params.bear_id;
  var name = req.body.name
  Bear.findById(bearID, function(err, bear) {
    if(err) res.send(err);
    // update bear
    bear.name = name
    // save the changes
    bear.save(function(err) {
      if(err) res.send(err);
    })
    res.json({message:"Bear Updated"})
  });
});

// Delete a bear
router.delete('/bears/:bear_id', function(req, res){
  Bear.remove({_id: req.params.bear_id}, function(err, bear) {
    if(err) console.log(err);
    res.send({message:"Bear deleted"})
  });
});

// Register the routes
// all of my routes will be prefixed with /api

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Server is running on port:" + port)
