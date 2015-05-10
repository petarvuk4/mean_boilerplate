'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require("./config/mongoose");
var express = require("./config/express");
var passport = require("./config/passport");

var db = mongoose();
var app = express();
var pass = passport();

app.listen(3000);

module.exports = app;

console.log("Server Listening on port " + 3000);