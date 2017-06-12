'use strict';

var QuizController = myApp.controller('QuizController', ['$scope', '$rootScope', '$mdDialog', '$sce',
    function($scope, $rootScope, $mdDialog, $sce) {
        $scope.quiz = {};
        $scope.module = $scope.$parent.module;

        $scope.quiz.submit = function(e, currentOption) {
            var title = "";
            if (currentOption.correct) {
                title = "Correct!";
            } else {
                title = "Not quite!";
            }

            $scope.module.submitQuizResponse(currentOption, function() {
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    // .title(title)
                    .htmlContent(feedbackHtml(currentOption))
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got It')
                    .targetEvent(e)
                );
            });
            // Save scope after update
            $scope.module = $scope.$parent.module;
        };

        function feedbackHtml(currentOption) {
            var response =
                '<h1>' + (currentOption.correct ? 'Correct!' : 'Not quite!') + '</h1>' +
                '<h4 class="answer">' + $scope.module.quizResponse + '</h4>' +
                '<br />';

            if ($scope.module.quizStatistics) {
                response += '<h3 class="statistics-header">How did you do compared to others?</h3>' +
                    '<div  class="statistics">' + $scope.module.quizStatistics + '</div>';
            }
            return $sce.trustAsHtml(response);
        }
    }
]);

myApp.component('quiz', {
    templateUrl: '/components/quiz/quiz.html',
    controller: 'QuizController',
    bindings: {
        module: '=',
        /* Here we're binding the entire module scope
         * as the parent of the quiz scope. This is
         * essential so we can prevent the user from
         * moving forward until they've answered the
         * quiz question! */
        slide: '<'
    }
});
