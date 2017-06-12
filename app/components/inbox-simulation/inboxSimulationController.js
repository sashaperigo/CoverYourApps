'use strict';

myApp.controller('inboxSimulationController', ['$scope','$http',
    function($scope, $http) {
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
