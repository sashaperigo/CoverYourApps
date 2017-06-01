'use strict';

var SketchyBccController = myApp.controller('SketchyBccController', ['$scope', '$rootScope', '$mdDialog',
    function($scope, $rootScope, $mdDialog) {
        var ctrl = this;
        $scope.sketchyBcc = {};
        $scope.content = $ctrl.slide.emailData;

        $scope.showCorrect = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Good choice!')
            .textContent('Congratulations! You successfully avoided this phishing attack.')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );
      };

      $scope.showIncorrect = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Uh oh!')
          .textContent('You fell for an email with a suspicious bcc/cc field, suggesting foul play.')
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .targetEvent(ev)
      );
    };
    }
]);

myApp.component('sketchyBcc', {
    templateUrl: '/components/sketchy-bcc/sketchyBcc.html',
    controller: 'SketchyBccController',
    bindings: {
        slide: '<'
        // module: '<' //= to make two-way binded
    }
});
