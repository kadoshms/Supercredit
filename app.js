/**
 * Supercard web service
 * Uses parse RESTful API
 */
// the class
var express = require('express');
var bodyParser = require('body-parser');

var express = require('express');
var bodyParser = require('body-parser');
//API routes
var purchases = require('./routes/purchases');
var restrictions = require('./routes/restrictions');
var app = express(); //Create the Express app
//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//API declares
app.use('/api', purchases);
app.use('/api', restrictions);
app.listen();
module.exports = app;