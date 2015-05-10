'use strict';

var mainAppModuleName = "mean";
var mainAppModule = angular.module(mainAppModuleName, ["ngRoute", "ngResource", 'users', 'articles']);

mainAppModule.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
   angular.bootstrap(document, [mainAppModuleName]);
});
