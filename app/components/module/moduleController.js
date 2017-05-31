'use strict';

var ModuleController = myApp.controller('ModuleController', ['$scope', '$rootScope', '$location',
    function($scope, $rootScope, $location) {
        $scope.module = {};
        $scope.module.name = "";
        $scope.module.pageNumber = 1;

        $scope.module.json = "";
        $scope.module.scripts = {};
        $scope.module.sectionNames = {};
        $scope.module.sectionNumber = 0;
        $scope.module.section = "";
        $scope.module.length = 10;
        $scope.module.slideType = "";
        $scope.module.slide = {};

        $scope.module.moduleComponent = "";
        $scope.module.moduleImage = null;
        

        $scope.$on('$viewContentLoaded', function() {
            // Select module from URL path
            var jsonSrc = "";
            if ($location.path().includes('auth')) {
                $scope.module.name = "Authentication";
                jsonSrc = "/module_text/auth.json";
            } else if ($location.path().includes('phishing')) {
                $scope.module.name = "Phishing";
                jsonSrc = "/module_text/phishing.json";
            }

            // Load content from json
            $scope.main.FetchModel(jsonSrc, function(data) {
                $scope.$apply(function() {
                    $scope.module.json = data;
                    for (var i = 0; i < data.length; i++) {
                        $scope.module.sectionNames[i] = data[i].sectionName;
                        $scope.module.scripts[data[i].sectionName] = data[i].slides;
                    }
                });
                $scope.module.nextSection();
            });
        });

        // Change slide number and content
        $scope.module.displayPageContent = function() {
            var section = $scope.module.json[$scope.module.sectionNumber - 1];
            var slide = section.slides[$scope.module.pageNumber - 1];
            $scope.module.slide = slide;

            // Place text into the inner HTML so the HTML tags within the
            // json render properly
            var textContainer = document.getElementById("text-content");
            textContainer.innerHTML = slide.text;
            
            $scope.safeApply(function() {
                if (slide.imageSrc) {
                    $scope.module.moduleImage = slide.imageSrc;
                } else {
                    $scope.module.moduleImage = null;
                }
                $scope.module.slideType = slide.slideType;
            });
        };

        // Return to the previous slide in a section
        $scope.module.decrementPage = function() {
            if ($scope.module.pageNumber === 1) {
                return;
            }
            $scope.module.pageNumber--;
            $scope.module.displayPageContent();
        };

        // Advance to the next slide in a section
        $scope.module.incrementPage = function() {
            if ($scope.module.pageNumber >= $scope.module.length) {
                return;
            }
            $scope.module.pageNumber++;
            $scope.module.displayPageContent();
        };

        // Advance to the next section
        $scope.module.nextSection = function() {
            $scope.module.section = $scope.module.json[$scope.module.sectionNumber].sectionName;
            $scope.module.length = $scope.module.json[$scope.module.sectionNumber].slides.length;
            $scope.module.pageNumber = 1;
            $scope.module.sectionNumber++;
            $scope.module.displayPageContent();
        };

        // Select a content section
        $scope.module.setSection = function(clicked) {
            $scope.module.section = clicked;
            $scope.module.pageNumber = 1;
            $scope.module.length = $scope.module.scripts[$scope.module.section].length;
        };
    }
]);

myApp.component('module', {
    templateUrl: '/components/module/module.html',
    transclude: true,
    controller: ModuleController
});
