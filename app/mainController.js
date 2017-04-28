'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({ redirectTo: '/view1' });
    }
]);

myApp.controller('MainController', ['$scope',
    function($scope) {
        $scope.main = {};
    }
]);
