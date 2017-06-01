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
        module: '=',    /* Here we're binding the entire module scope
                         * as the parent of the quiz scope. This is
                         * essential so we can prevent the user from
                         * moving forward until they've answered the
                         * quiz question! */
        slide: '<'
    }
});
