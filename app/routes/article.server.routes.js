'use strict';

var userCtrl = require('../controllers/user.server.controller')
var articleCtrl = require("../controllers/article.server.controller");

module.exports = function(app) {

    app.route("/api/articles")
        .get(articleCtrl.list)
        .post(userCtrl.requiresLogin, articleCtrl.create);

    app.route("/api/articles/:articleId")
        .get(articleCtrl.read)
        .delete(userCtrl.requiresLogin, articleCtrl.hasAuthorization, articleCtrl.remove)
        .put(userCtrl.requiresLogin, articleCtrl.hasAuthorization, articleCtrl.update);

    app.param("articleId", articleCtrl.findById);
};