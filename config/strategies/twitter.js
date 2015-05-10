'use strict';

var passport = require("passport"),
    url = require("url"),
    TwitterStrategy = require("passport-twitter").Strategy,
    user = require("../../app/controllers/user.server.controller"),
    config = require("../config");


module.exports = function() {
    passport.use(new TwitterStrategy({
        consumerKey: config.twitter.clientID,
        consumerSecret: config.twitter.clientSecret,
        callbackURL: config.twitter.callbackURL,
        passReqToCallback: true
    }, function(req, token, tokenSecret, profile, done) {
        var provider = profile._json;
        provider.token = token;
        provider.tokenSecret = tokenSecret;

        var fullProfile = {
            fullName: profile.displayName,
            username: profile.username,
            provider: 'twitter',
            providerId: profile.id,
            providerData: providerData
        };

        user.saveOAuthUserProfile(req, fullProfile, done);
    }));
};