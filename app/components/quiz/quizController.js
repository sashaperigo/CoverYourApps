'use strict';

var QuizController = myApp.controller('QuizController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        $scope.quiz = {};
        $scope.module = $scope.$parent.module;

        $scope.quiz.submit = function(currentOption) {
            $scope.module.submitQuizResponse(currentOption);
            // Save scope after update
            $scope.module = $scope.$parent.module;
        };
    }
]);

myApp.component('quiz', {
    templateUrl: '/components/quiz/quiz.html',
    controller: 'QuizController',
    bindings: {
        module: '=', // Bind the entire module scope as a parent
        slide: '<'
    }
});
