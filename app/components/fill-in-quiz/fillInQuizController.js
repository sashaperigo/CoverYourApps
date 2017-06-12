'use strict';

var fillInQuizController = myApp.controller('fillInQuizController', ['$scope', '$rootScope', '$mdDialog',
    function($scope, $rootScope, $mdDialog) {
        var ctrl = this;
        $scope.fillInQuiz = {};
        // Hacky module Controller access TODO @Sasha can bind??
        $scope.module = $scope.$parent.$parent.$parent.$parent.module;

        // Add URL for sketchyUrl simulation if necessary, otherwise leave link
        // field blank.
        if (ctrl.slide.options[1].link != null) {
          $scope.url = ctrl.slide.options[1].link;
        }

        $scope.fillInQuiz.notYet = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            ev.preventDefault();
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title("Whoops!")
                .textContent("Don't click me yet, check where I actually link to!")
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );
        };

        $scope.fillInQuiz.doNothing = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            // If correct
            if ($scope.fillInQuiz.submittedUrl === ctrl.slide.answer){
              $mdDialog.show(
                  $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title(ctrl.slide.options[0].header)
                  .textContent(ctrl.slide.options[0].feedback)
                  .ariaLabel('Alert Dialog Demo')
                  .ok('Got it!')
                  .targetEvent(ev)
              );
              $scope.module.allowNext();
            }
            else{ // If incorrect
              $mdDialog.show(
                  $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title(ctrl.slide.options[1].header)
                  .textContent(ctrl.slide.options[1].feedback)
                  .ariaLabel('Alert Dialog Demo')
                  .ok('Got it!')
                  .targetEvent(ev)
              );
            }
        };
    }
]);

myApp.component('fillInQuiz', {
    templateUrl: '/components/fill-in-quiz/fillInQuiz.html',
    controller: 'fillInQuizController',
    bindings: {
        slide: '<'
    }
});
