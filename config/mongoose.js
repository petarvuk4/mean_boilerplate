'use strict';

var config = require("./config"),
    mongoose = require("mongoose");

module.exports = function() {
    var db = mongoose.connect(config.db);

    db.connection.on("error", console.error.bind("Error With Database: "));
    db.connection.once("open", function(callback) {
        console.log("Connection Open");
    });


    require("../app/models/user.server.model");
    require("../app/models/article.server.model");

    return db;
};