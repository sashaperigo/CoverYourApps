'use strict';

myApp.controller('inboxSimulationController', ['$scope','$http', '$mdDialog',
    function($scope, $http, $mdDialog) {
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
    }
]);

myApp.component('inboxSimulation', {
    templateUrl: '/components/inbox-simulation/inboxSimulation.html',
    controller: 'inboxSimulationController',
    bindings: {
    }
});
