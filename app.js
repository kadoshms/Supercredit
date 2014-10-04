/**
 * Supercard web service
 * Uses parse RESTful API
 */
// the class
var express = require('express');
var bodyParser = require('body-parser');

var express = require('express');
var bodyParser = require('body-parser');
var purchases = require('./routes/purchases'); //routes are defined here
var app = express(); //Create the Express app
//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api', purchases); //This is our route middleware
app.listen();
module.exports = app;