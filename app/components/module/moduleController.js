'use strict';

var ModuleController = myApp.controller('ModuleController', ['$scope', '$rootScope', '$location', '$http',
    function($scope, $rootScope, $location, $http) {
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

        $scope.module.moduleComponent = null;
        $scope.module.moduleImage = null;

        $scope.module.currentSlide = null;

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
                $scope.module.json = data;
                for (var i = 0; i < data.length; i++) {
                    $scope.module.sectionNames[i] = data[i].sectionName;
                    $scope.module.scripts[data[i].sectionName] = data[i].slides;
                }
                $scope.module.loadProgress();
            });

        });

        // Change slide number and content
        $scope.module.displayPageContent = function() {
            var section = $scope.module.json[$scope.module.sectionNumber - 1];
            var slide = section.slides[$scope.module.pageNumber - 1];
            $scope.module.slide = slide;
            $scope.module.currentSlide = slide;
            $scope.module.slideType = slide.slideType;
            $scope.safeApply();
            console.log($scope.module.currentSlide);
            $scope.module.saveProgress();
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

        $scope.module.prevSection = function() {
            $scope.module.section = $scope.module.json[$scope.module.sectionNumber].sectionName;
            $scope.module.length = $scope.module.json[$scope.module.sectionNumber].slides.length;
            $scope.module.pageNumber = 1;
            $scope.module.sectionNumber--;
            $scope.module.displayPageContent();
        };

        // Manually switch content section with dropdown menu
        $scope.module.setSection = function(index, name) {
            $scope.module.section = name;
            $scope.module.sectionNumber = index + 1; // Switch from 0 to 1 index
            $scope.module.pageNumber = 1;
            $scope.module.length = $scope.module.scripts[$scope.module.section].length;
            $scope.module.displayPageContent();
        };

        $scope.module.submitResponse = function(clicked) {
            $scope.module.displayAnswer = true;
            for(var i = 0; i < $scope.module.slide.options.length; i++) {
                var currentOption = $scope.module.slide.options[i];
                if(clicked.text === currentOption.text) {
                    $scope.module.response = currentOption.feedback;
                    $scope.module.responseCorrect = currentOption.correct;
                }
            }
        };

        // Saves current section number and page number to session
        $scope.module.loadProgress = function() {
            $http.get('/api/progress/' + $scope.module.name)
              .then(function successCallback(response) {
                  console.log('got some saved progress:', response.data)
                  $scope.module.sectionNumber = response.data.section;
                  $scope.module.section = $scope.module.sectionNames[$scope.module.sectionNumber - 1]; // AAAAH INDEXING
                  $scope.module.pageNumber = response.data.page;
                  $scope.module.length = $scope.module.scripts[$scope.module.section].length;
                  $scope.module.displayPageContent();
              }, function errorCallback(response) {
                  // If there's an error, load the first page of the first section
                  console.error(response.data || 'Error loading saved progress');
                  var firstSectionName = $scope.module.sectionNames[0];
                  $scope.module.setSection(0, firstSectionName);
              });
        };

        // Loads saved section/page from session - if none, load first page
        $scope.module.saveProgress = function() {
            $http.post('/api/progress/' + $scope.module.name + '/' + $scope.module.sectionNumber + '/' + $scope.module.pageNumber)
              .then(function successCallback(response) {
                  console.log('saved progress!');
              }, function errrorCallback(response) {
                  console.error(response.data || 'Error saving progress');
              });
        }
    }
]);

myApp.component('module', {
    templateUrl: '/components/module/module.html',
    transclude: true,
    controller: ModuleController
});
