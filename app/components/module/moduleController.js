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

        $scope.module.buttonGlow = false;

        $scope.module.moduleComponent = null;
        $scope.module.moduleImage = null;
        $scope.module.username = "";

        $scope.$on('$viewContentLoaded', function() {
            // Select module from URL path
            var jsonSrc = "";
            if ($location.path().includes('auth')) {
                $scope.module.name = "Passwords";
                jsonSrc = "/module_text/auth.json";
            } else if ($location.path().includes('phishing')) {
                $scope.module.name = "Email and Link Safety";
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
            $scope.module.slideType = slide.slideType;

            // Next button should glows after two seconds!
            setTimeout(function() {
                $scope.module.buttonGlow = true;
                $scope.safeApply();
            }, 2000);

            $scope.safeApply();
            $scope.module.saveProgress();
        };

        // Return to the previous slide in a section
        $scope.module.decrementPage = function() {
            console.assert($scope.module.pageNumber !== 1,
                "Error: user is on the first slide of the section!");
            $scope.module.buttonGlow = false;
            $scope.module.pageNumber--;
            $scope.module.displayQuizAnswer = false;
            $scope.module.displayPageContent();
        };

        // Advance to the next slide in a section
        $scope.module.incrementPage = function(ev) {
            console.assert($scope.module.pageNumber !== $scope.module.length,
                "Error: user is on the last slide in the section!");
            console.assert(!($scope.module.slideType === "quiz" && $scope.module.displayQuizAnswer === false),
                "Error: user should not proceed without answering quiz question!");
            $scope.module.buttonGlow = false;

            $scope.module.pageNumber++;
            $scope.module.displayQuizAnswer = false;
            $scope.module.displayPageContent();
        };

        $scope.module.allowNext = function() {
            $scope.module.displayQuizAnswer = true;
        };

        // Advance to the next section
        $scope.module.nextSection = function() {
            console.assert(!($scope.module.slideType === "quiz" && $scope.module.displayQuizAnswer === false),
                "Error: user should not proceed without answering quiz question!");
            $scope.module.section = $scope.module.json[$scope.module.sectionNumber].sectionName;
            $scope.module.length = $scope.module.json[$scope.module.sectionNumber].slides.length;
            $scope.module.pageNumber = 1;
            $scope.module.buttonGlow = false;
            $scope.module.sectionNumber++;
            $scope.module.displayPageContent();
        };

        // Return to the previous section
        $scope.module.prevSection = function() {
            $scope.module.section = $scope.module.json[$scope.module.sectionNumber - 2].sectionName;
            $scope.module.length = $scope.module.json[$scope.module.sectionNumber - 2].slides.length;
            $scope.module.buttonGlow = false;
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

        // Quiz variables need to be in the moduleController because they have
        // to be accessible in both module.html and quiz.html!
        // These are all used in sketchyEmail as well as quiz!
        // displayQuizAnswer is used to tell us if we can go to the next slide (ng-disabled stuff)
        $scope.module.displayQuizAnswer = false;
        $scope.module.quizResponse = "";
        $scope.module.quizResponseCorrect = false;
        $scope.module.quizStatistics = "";

        // Used for submit quiz and for sumbit email
        $scope.module.submitQuizResponse = function(clicked, callback) {
            $scope.module.displayQuizAnswer = true;
            $scope.module.quizResponseCorrect = clicked.correct;
            $scope.module.quizResponse = clicked.feedback;
            $scope.main.trackBehavior($scope.module.slide.name, clicked.text,
                function(data, resultString) {
                    $scope.module.quizStatistics = resultString;
                    if (callback) callback();
                });
            $scope.module.buttonGlow = true;
        };

        // Saves current section number and page number to session
        $scope.module.loadProgress = function() {
            $http.get('/api/progress/' + $scope.module.name)
                .then(function successCallback(response) {
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
                .then(function successCallback(response) {}, function errrorCallback(response) {
                    console.error(response.data || 'Error saving progress');
                });
        };

        // Saves username
        $scope.module.loadUsername = function() {
            $http.get('/api/username/')
                .then(function successCallback(response) {
                    if (response.data.username) {
                        $scope.module.username = response.data.username;
                    } else {
                        $scope.module.saveUsername();
                    }
                    console.log($scope.module.username);
                }, function errorCallback(response) {
                    // If there's an error, load the first page of the first section
                    console.error(response.data || 'Error loading username');
                });
        };

        // Loads saved username
        $scope.module.saveUsername = function() {
            $scope.module.username = prompt('What is your name?');
            $http.post('/api/username/' + $scope.module.username)
                .then(function successCallback(response) {}, function errrorCallback(response) {
                    console.error(response.data || 'Error saving username');
                });
        };

        $scope.module.loadUsername();
    }
]);

myApp.component('module', {
    templateUrl: '/components/module/module.html',
    transclude: true,
    controller: 'ModuleController'
});
