'use strict';

var SketchyUrlController = myApp.controller('SketchyUrlController', ['$scope', '$rootScope', '$mdDialog',
    function($scope, $rootScope, $mdDialog) {
        $scope.sketchyUrl = {};

        $scope.showCorrect = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Good choice!')
            .textContent('Congratulations! You successfully avoided clicking a sketchy link.')
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
          .textContent('This is an unsafe link! Double check the domain on this... you will see that it is actually .bs for Bahamas.')
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .targetEvent(ev)
      );
    };
    }
]);

myApp.component('sketchyUrl', {
    templateUrl: '/components/sketchy-url/sketchyUrl.html',
    controller: 'SketchyUrlController',
    bindings: {
        module: '<' //= to make two-way binded
    }
});
