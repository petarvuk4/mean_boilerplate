'use strict';

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var articleModel = new Schema({
    title: {
        type: String,
        required: "Title is required",
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    creator: {
        type: Schema.ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model("Article", articleModel);