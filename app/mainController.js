'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngResource']);

myApp.config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/about-us', {
            templateUrl: 'components/about-us/aboutUs.html',
            controller: 'AboutUsController'
        }).
        when('/phishing', {
            templateUrl: 'components/phishing/phishing.html',
            controller: 'PhishingController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

myApp.controller('MainController', ['$scope',
    function($scope) {
        $scope.main = {};

        $scope.main.showDropdown = false;

        $scope.myFunction = function(element) {
            $scope.main.showDropdown = !$scope.main.showDropdown;
        };
    }
]);
