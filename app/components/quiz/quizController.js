'use strict';

var QuizController = myApp.controller('QuizController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        var ctrl = this;
        $scope.quiz = {};
        $scope.quiz.displayAnswer = false;
        $scope.quiz.response = "";
        $scope.quiz.responseCorrect = false;

        $scope.quiz.submitResponse = function(clicked) {
            $scope.quiz.displayAnswer = true;
            for (var i = 0; i < ctrl.slide.options.length; i++) {
                var currentOption = ctrl.slide.options[i];
                if (clicked.text === currentOption.text) {
                    $scope.quiz.response = currentOption.feedback;
                    $scope.quiz.responseCorrect = currentOption.correct;
                }
            }
        };
    }
]);

myApp.component('quiz', {
    templateUrl: '/components/quiz/quiz.html',
    controller: 'QuizController',
    bindings: {
        slide: '<'
            // module: '=' //= to make two-way binded
    }
});
