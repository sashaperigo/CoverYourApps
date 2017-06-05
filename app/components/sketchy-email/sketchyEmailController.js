'use strict';

var SketchyEmailController = myApp.controller('SketchyEmailController', ['$scope', '$rootScope', '$mdDialog',
    function($scope, $rootScope, $mdDialog) {
        var ctrl = this;
        $scope.sketchyEmail = {};
        // Hacky module Controller acces TODO @Sasha can bind??
        $scope.module = $scope.$parent.$parent.$parent.$parent.module;

        // Add URL for sketchyUrl simulation if necessary, otherwise leave link
        // field blank.
        if (ctrl.slide.options[1].link != null) {
          $scope.sketchyUrl = ctrl.slide.options[1].link;
        }

        $scope.sketchyEmail.delete = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
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
        };

        $scope.sketchyEmail.reply = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
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
            $scope.module.allowNext();
        };
    }
]);

myApp.component('sketchyEmail', {
    templateUrl: '/components/sketchy-email/sketchyEmail.html',
    controller: 'SketchyEmailController',
    bindings: {
        slide: '<'
    }
});
