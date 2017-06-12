'use strict';

myApp.controller('inboxSimulationController', ['$scope','$http', '$mdDialog', '$sce',
    function($scope, $http, $mdDialog, $sce) {
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
                    var msg = 'Make sure to take care of the email with the subject "' + email.emailData.subject + '" - either follow the instructions in it or delete it';
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
            }
                // If we get here that means we've taken care of all emails!
                $scope.disableDone = true;
                var currentEmail = $scope.emails[0];
                var currentResource = currentEmail.name;
                var currentBehavior = currentEmail.actioned ? 'trusted' : 'deleted';
                $scope.main.trackBehavior(currentResource, currentBehavior, function(data, resultString) {
                    currentEmail.stats = resultString;
                    currentEmail = $scope.emails[1];
                    currentResource = currentEmail.name;
                    currentBehavior = currentEmail.actioned ? 'trusted' : 'deleted';
                    $scope.main.trackBehavior(currentResource, currentBehavior, function(data, resultString) {
                        currentEmail.stats = resultString;
                        currentEmail = $scope.emails[2];
                        currentResource = currentEmail.name;
                        currentBehavior = currentEmail.actioned ? 'trusted' : 'deleted';
                        $scope.main.trackBehavior(currentResource, currentBehavior, function(data, resultString) {
                            currentEmail.stats = resultString;
                            currentEmail = $scope.emails[3];
                            currentResource = currentEmail.name;
                            currentBehavior = currentEmail.actioned ? 'trusted' : 'deleted';
                            $scope.main.trackBehavior(currentResource, currentBehavior, function(data, resultString) {
                                currentEmail.stats = resultString;
                                $scope.module.displayQuizAnswer = true;
                                $mdDialog.show(
                                    $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .htmlContent(feedbackHtml())
                                    .ariaLabel('Alert Dialog Demo')
                                    .ok('Got it!')
                                    .targetEvent(ev)
                                );
                            });
                        });
                    });
                });

        }

        function feedbackHtml() {
            var msg = '<h1>How did you do?</h1>';
            for (var i = 0; i < $scope.emails.length; i++) {
                var email = $scope.emails[i];
                msg += '<h3>"' + email.emailData.subject + '"</h3><p>';
                if (email.actioned) {
                    msg += email.options[1].feedback;
                }
                else if (email.deleted) {
                    msg += email.options[0].feedback;
                }
                msg += '</p>' + email.stats;
            }
            return $sce.trustAsHtml(msg);
        }
    }
]);

myApp.component('inboxSimulation', {
    templateUrl: '/components/inbox-simulation/inboxSimulation.html',
    controller: 'inboxSimulationController',
    bindings: {
    }
});
