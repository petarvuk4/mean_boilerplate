'use strict';

var mongoose = require("mongoose"),
    Article = mongoose.model("Article");

var errorHandler = function(err) {
    if(err.errors)
        for(var error in err.errors)
            if(err.errors[error].message) return err.errors[error].message;
    else
        return "Unknown server error";
};

exports.hasAuthorization = function(req, res, next) {
      if(req.article.creator.id !== req.user.id)
          return res.status(403).send({message: 'User is not authorized'});

      next();
};

exports.create = function(req, res, next) {

    console.log(req);

    var article = new Article(req.body);
    article.creator = req.user;

    article.save(function(err) {
        if(err)
            return res.status(401).send({message: errorHandler(err)});
        else
            res.json(article);
    });
};

exports.read = function(req, res, next) {

};

exports.list = function(req, res, next) {
    Article.find().sort("-created").populate("creator", "firstName lastName fullName")
        .exec(function(err, articles) {
            if(err)
                return res.status(401).send({message: errorHandler(err)});
            else
                res.json(articles);
        });
};

exports.update = function(req, res, next) {
    var article = req.article;
    console.log(article);

    article.title = req.body.title;
    article.content = req.body.content;

    article.save(function(err) {
        if(err)
            return res.status(400).send({message: errorHandler(err)});
        else
            res.json(article);
    });
};

exports.remove = function(req, res) {
    var article = req.article;

    article.remove(function(err) {
        if(err)
            return res.status(401).send({message: errorHandler(err)});
        else
            res.json(article);
    });
};

exports.read = function(req, res, err) {
    var article = req.article;

    if(article)
        res.json(article);
    else
        res.json(err);
};

exports.findById = function(req, res, next, id) {
    Article.findById(id).populate("creator", "firstName lastName fullName")
        .exec(function(err, article) {

            if (err) return next(err);

            if (!article) return next(new Error('Failed to load article '+ id));

            req.article = article;
            next();
        });
};
