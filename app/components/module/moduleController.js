'use strict';

myApp.controller('ModuleController', ['$scope', '$rootScope', '$location',
    function($scope, $rootScope, $location) {
        $scope.module = {};
        $scope.module.name = "";
        $scope.module.pageNumber = 0;

        $scope.$on('$viewContentLoaded', function() {
            if ($location.path().includes('auth')) {
            	$scope.module.name = "Authentication";
            } else if ($location.path().includes('phishing')) {
            	$scope.module.name = "Phishing";
            }
            $scope.module.pageNumber = 1;

            // Retrieve this from json files.
            $scope.module.maxPages = 10;
        });

        $scope.module.decrementPage = function() {
        	if ($scope.module.pageNumber === 1) {
        		return;
        	}
        	$scope.module.pageNumber--;
        };

        $scope.module.incrementPage = function() {
        	if ($scope.module.pageNumber >= $scope.module.maxPages) {
        		return;
        	}
        	$scope.module.pageNumber++;
        };
    }
]);
