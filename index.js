var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var config = require('./configs/dbConfig.js');
var productRouter = require('./routes/product');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Header","Origin,X-Requested-With,Content-Type,Accept");
  next();
});

mongoose.connect(config.url)
  .then(function(){
    console.log("Successfully connected to the database");
  }).catch(function(err){
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
  });;

app.use('/',productRouter);

app.use((req,res,next)=>{
  const error = new Error('Not found');
  error.status(404);
  next(error);
});

app.use((error,req,res,next)=>{
  res.status(error.status||500);
  res.json({
    error:{message:error.message}
  });
});

module.exports = app;