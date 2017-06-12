'use strict';

myApp.controller('inboxSimulationController', ['$scope','$http', '$mdDialog',
    function($scope, $http, $mdDialog) {
        $scope.module = $scope.$parent.module;
        $scope.main = $scope.$parent.main;
        console.log($scope.module);
        console.log($scope.main);

        $scope.allSeen = false;

        $http.get('/module_text/inbox.json')
            .then(function successCallback(response){
                $scope.emails = response.data.slides;
                // Maybe it's biased, but IT'S GOOD ENOUGH https://www.w3schools.com/js/js_array_sort.asp
                $scope.emails.sort(function(a, b){return 0.5 - Math.random()});
            }, function errorCallback(response) {
                console.error(response.data || 'Error loading inbox simulation');
            });

        $scope.chooseEmail = function (email) {
            email.seen = true;
            $scope.allSeen = $scope.emails.every(function (e) { return e.seen });
            $scope.rhs = email;
        };

        $scope.action = function(ev) {
          ev.preventDefault();
          $mdDialog.show({
            controller: $scope.rhs.controller,
            templateUrl: $scope.rhs.templateUrl,
            parent: angular.element(document.body),
            locals: {email: $scope.rhs},
            bindToController: true,
            targetEvent: ev,
            clickOutsideToClose: false,
            escapeToClose: false,
            ariaLabel: "Tiny version of a webpage",
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          })
          .then(function() {
            console.log('action done');
            $scope.rhs.actioned = true;
          }, function() {
            console.log('action cancelled');
          })};

        $scope.deleteEmail = function() {
            $scope.rhs.deleted = true;
            $scope.rhs = null;
        };

        $scope.allDone = function(ev) {
            for (var i = 0; i < $scope.emails.length; i++) {
                var email = $scope.emails[i];
                if (!email.deleted && !email.actioned) {
                    var msg = 'Make sure to take care of the email with the subject"' + email.emailData.subject + '" - either follow the instructions in it or delete it';
                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .textContent(msg)
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        .targetEvent(ev)
                    );
                    return;
                }
                // If we get here that means we've taken care of all emails!
                $scope.module.displayQuizAnswer = true;
            }
        }
    }
]);

myApp.component('inboxSimulation', {
    templateUrl: '/components/inbox-simulation/inboxSimulation.html',
    controller: 'inboxSimulationController',
    bindings: {
    }
});
