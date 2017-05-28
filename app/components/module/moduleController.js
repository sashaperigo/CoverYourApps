'use strict';

var ModuleController = myApp.controller('ModuleController', ['$scope', '$rootScope', '$location',
    function($scope, $rootScope, $location) {
        $scope.module = {};
        $scope.module.name = "";
        $scope.module.pageNumber = 0;

        $scope.module.json = "";
        $scope.module.scripts = {};
        $scope.module.sectionNames = {};
        $scope.module.sectionNumber = 0;
        $scope.module.section = "";
        $scope.module.length = 10;

        $scope.module.moduleComponent = true;
        $scope.module.moduleImage = false;

        $scope.$on('$viewContentLoaded', function() {
            var jsonSrc = "";
            if ($location.path().includes('auth')) {
                $scope.module.name = "Authentication";
            } else if ($location.path().includes('phishing')) {
                $scope.module.name = "Phishing";
                jsonSrc = "/module_text/phishing.json";
            }
            $scope.module.pageNumber = 1;

            $scope.main.FetchModel(jsonSrc, function(data) {
                $scope.$apply(function() {
                    $scope.module.json = data;
                    for (var i = 0; i < data.length; i++) {
                        $scope.module.sectionNames[i] = data[i].sectionName;
                        $scope.module.scripts[data[i].sectionName] = data[i].slides;
                    }
                });
                $scope.module.nextSection();
                $scope.module.displayPageContent();
            });
        });

        $scope.module.displayPageContent = function() {
            var sectionSlides = $scope.module.json[$scope.module.sectionNumber - 1].slides;
            var textContainer = document.getElementById("text-content");
            textContainer.innerHTML = sectionSlides[$scope.module.pageNumber - 1].text;
        };

        $scope.module.decrementPage = function() {
            if ($scope.module.pageNumber === 1) {
                return;
            }
            $scope.module.pageNumber--;
            $scope.module.displayPageContent();
        };

        $scope.module.incrementPage = function() {
            if ($scope.module.pageNumber >= $scope.module.length) {
                return;
            }
            $scope.module.pageNumber++;
            $scope.module.displayPageContent();
        };

        $scope.module.nextSection = function() {
            $scope.module.section = $scope.module.json[$scope.module.sectionNumber].sectionName;
            $scope.module.length = $scope.module.json[$scope.module.sectionNumber].slides.length;
            $scope.module.pageNumber = 1;
            $scope.module.sectionNumber++;
        };

        $scope.module.setSection = function(clicked) {
            $scope.module.section = clicked;
            $scope.module.pageNumber = 1;
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
    }
]);

myApp.component('module', {
    templateUrl: '/components/module/module.html',
    controller: ModuleController,
    bindings: {}
});
