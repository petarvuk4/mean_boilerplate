'use strict';

angular.module("users").controller("UsersCtrl", ["$scope", "Authentication",
    function($scope, Authentication) {
        $scope.name = Authentication.user ? Authentication.user.fullName : "MEAN APP";
    }
]);