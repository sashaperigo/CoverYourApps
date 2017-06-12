'use strict';

myApp.controller('inboxSimulationController', ['$scope','$http', '$mdDialog',
    function($scope, $http, $mdDialog) {
        $http.get('/module_text/inbox.json')
            .then(function successCallback(response){
                $scope.emails = response.data.slides;
                // May it's biased, but IT'S GOOD ENOUGH https://www.w3schools.com/js/js_array_sort.asp
                $scope.emails.sort(function(a, b){return 0.5 - Math.random()});
            }, function errorCallback(response) {
                console.error(response.data || 'Error loading inbox simulation');
            });

        $scope.chooseEmail = function (email) {
            email.seen = true;
            $scope.rhs = email;
            console.log($scope.rhs);
        };

        $scope.action = function(ev) {
          $mdDialog.show({
            controller: "GoogleLoginController",
            templateUrl: '/components/google-login/googleLogin.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          })
          .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.status = 'You cancelled the dialog.';
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
