'use strict';

myApp.controller('ModuleController', ['$scope', '$rootScope', '$location',
    function($scope, $rootScope, $location) {
        $scope.module = {};
        $scope.module.name = "";
        $scope.module.pageNumber = 0;

        $scope.module.json = "";
        $scope.module.scripts = {};
        $scope.module.sectionNames = {};
        $scope.module.section = "";
        $scope.module.length = 10;

        $scope.module.moduleComponent = "sketchyUrl";
        $scope.module.moduleImage = false;

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
        
        $scope.module.setSection = function(clicked) {
            $scope.module.section = clicked;
            $scope.module.length = $scope.module.scripts[$scope.module.section].length;
        };
        
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
        $scope.callback = function(data) {
            $scope.$apply(function () {
                $scope.module.json = data;
                for(var i = 0; i < data.length; i++) {
                    $scope.module.sectionNames[i] = data[i].sectionName;
                    $scope.module.scripts[data[i].sectionName] = data[i].slides;
                }
            });
        };
        $scope.main.FetchModel("/module_text/phishing.json", $scope.callback);
        
        $scope.module.incrementPage = function() {
        	if ($scope.module.pageNumber >= $scope.module.maxPages) {
        		return;
        	}
        	$scope.module.pageNumber++;
        };
    }
]);
