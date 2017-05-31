'use strict';

var QuizController = myApp.controller('QuizController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        $scope.quiz = {};
        console.log('loaded quiz');
        console.log($scope.main);
        $scope.module = $scope.$parent.module;
    }
]);

myApp.component('quiz', {
    templateUrl: '/components/quiz/quiz.html',
    controller: 'QuizController',
    bindings: {
        module: '=' //= to make two-way binded
    }
});
