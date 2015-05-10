'use strict';

var app = require("../../server"),
    request = require("supertest"),
    should = require("should"),
    mongoose = require("mongoose"),
    User = mongoose.model("User"),
    Article = mongoose.model("Article");

var user, article;


beforeEach(function(done) {
    user = new User({
        firstName: 'Full',
        lastName: 'Name',
        fullName: 'Full Name',
        email: 'lalala@test.com',
        username: 'lalala',
        password: 'password',
        provider: "local"
    });

    user.save(function(err) {
        if(err) done(err);

        article = new Article({
            title: 'Article Title',
            content: 'Article Content',
            creator: user
        });

        article.save(function(err) {

            if(err) done(err);

            done();
        });
    });
});

afterEach(function(done) {
    article.remove();
    user.remove();
    done();
});

describe("Testing the GET methods", function() {

    it("Should be able to get list of articles", function(done) {
        request(app).get("/api/articles")
            .set("Accept", "application/json")
            .type("json")
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(200)
            .end(function(err, res) {

                if(err) done(err);

                res.body.should.be.an.Array.and.have.lengthOf(6);
                res.body[0].should.have.property("title", article.title);
                res.body[0].should.have.property("content", article.content);

                done();
            });
    });

    it("should be able to get the specific article", function(done) {
        request(app).get("/api/articles/"+article.id)
            .set("Accept", "application/json")
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(200)
            .end(function(err, res) {

                if(err) done(err);

                res.body.should.be.an.Object.and.have.property("title", article.title);
                res.body.should.have.property("content", article.content);

                done();
            });
    });
});


describe("Testing the POST methods", function() {
    it("should be able to update article", function(done) {

        var articleUpdated = {
            title: "updated",
            content: "updated"
        };

        request(app).put("/api/articles/"+article.id)
            .send(articleUpdated)
            .set("Accept", "application/json")
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(200)
            .end(function(err, res) {

                if(err) return done(err);

                res.body.should.have.property("title", articleUpdated.title);
                res.body.should.have.property("content", articleUpdated.content);


                done();
            });
    });
});

