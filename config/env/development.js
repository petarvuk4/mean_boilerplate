'use strict';

module.exports = {
    sessionSecret: 'thisissomesessionsecret',
    db: "mongodb://localhost/mean",
    facebook: {
        clientID: 'Application Id',
        clientSecret: 'Application Secret',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    },
    twitter: {
        clientID: 'Application Id',
        clientSecret: 'Application Secret',
        callbackURL: 'http://localhost:3000/oauth/twitter/callback'
    },
    google: {
        clientID: 'Application Id',
        clientSecret: 'Application Secret',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    },
    instagram: {
        clientID: 'Application Id',
        clientSecret: 'Application Secret',
        callbackURL: 'http://localhost:3000/oauth/instagram/callback'
    }

};