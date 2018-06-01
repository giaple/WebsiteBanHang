var express = require('express');
var mongoose = require('mongoose');

var config = require('./configs/dbConfig.js');
var productRouter = require('./routes/product');

var app = express();

mongoose.connect(config.url)
  .then(function(){
    console.log("Successfully connected to the database");
  }).catch(function(err){
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
  });;

app.use('/',productRouter);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});