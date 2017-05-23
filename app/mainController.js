'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngResource']);

myApp.config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/', {
            templateUrl: 'components/landing/landing.html',
            controller: 'landingController'
        }).
        when('/about-us', {
            templateUrl: 'components/about-us/aboutUs.html',
            controller: 'AboutUsController'
        }).
        when('/module-list', {
            templateUrl: 'components/module-list/module-list.html',
            controller: 'ModuleListController'
        }).
        when('/auth', {
            templateUrl: 'components/module/module.html',
            controller: 'ModuleController'
        }).
        when('/phishing', {
            templateUrl: 'components/module/module.html',
            controller: 'ModuleController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

myApp.controller('MainController', ['$scope',
    function($scope) {
        $scope.main = {};

    }
]);
