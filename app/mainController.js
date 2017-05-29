'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

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
            templateUrl: 'components/module-list/moduleList.html',
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

myApp.controller('MainController', ['$scope', '$http',
    function($scope, $http) {
        $scope.main = {};
        $scope.main.FetchModel = function(url, callback) {
            var data;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    callback(JSON.parse(xmlhttp.responseText));
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        };

        /* Code from: https://coderwall.com/p/ngisma/safe-apply-in-angular-js
         *
         * Used in displayPageContent() in moduleController.js to patch an
         * issue where apply should be called the first time a module loads,
         * but does not need to be called after the fact. This led to a
         * multitude of '$apply already in progress' errors being thrown,
         * and the images in the module were not changing.
         *
         * This function fixes that issue by wrapping $scope.apply() in a check
         * to ensure that apply is not already being called. Feel free to use
         * elsewhere as well!
         */
        $scope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        $scope.main.trackBehavior = function(resource, behavior, callback) {
            $http.post('api/track/' + resource + '/' + behavior)
              .then(function successCallback(response) {
                  var total = response.data.reduce(function(soFar, entry) {
                      return soFar + (+entry.count)
                  }, 0);
                  console.log(total);
                  var resultString = '';
                  for (var i = 0; i < response.data.length; i++) {
                      var percent = Math.round(100 * response.data[i].count / total).toString();
                      resultString += percent + '% of people selected ' +
                        response.data[i].behavior + '. ';
                  }
                  callback(response.data, resultString);
              }, function errorCallback(response) {
                  console.error(response.data || 'Error loading data');
                  alert('There was an error loading data.');
              });
        };
    }
]);
