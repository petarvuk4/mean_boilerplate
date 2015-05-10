'use strict';

var app = require("../../server.js"),
    should = require("should"),
    mongoose = require("mongoose"),
    User = mongoose.model("User"),
    Article = mongoose.model("Article");

var user, article;

beforeEach(function(done) {
    user = new User({
        firstName: 'Petar',
        lastName: 'Vukasinovic',
        displayName: 'Petar Vukasinovic',
        email: 'petar@gmail.com',
        username: 'petarvuk4',
        password: 'petarinata'
    });

    user.save(function(err) {
        article = new Article({
            title: 'Article Title',
            content: 'Article Content',
            user: user
        });

        done();
    });
});

afterEach(function(done) {
    article.remove(function() {
        user.remove(function() {
            done();
        });
    });
});

describe("Testing the save method", function() {
    it("Should be able to save the article", function() {
        article.save(function(err) {
            should.not.exist(err);
        });
    });

    it("should not be able to save article without title", function() {
        article.title = "";

        article.save(function(err) {
            should.exist(err);
        });
    });
});

