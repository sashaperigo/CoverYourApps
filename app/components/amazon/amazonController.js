'use strict';

myApp.controller('AmazonController', ['$scope', '$rootScope', '$mdDialog',
    function($scope, $rootScope, $mdDialog) {
        // successfully perform action
        $scope.buyFish = function() {
            $mdDialog.hide();
        }

        // user did not actually perform action
        $scope.close = function() {
            $mdDialog.cancel();
        }
    }
]);

myApp.component('amazon', {
    templateUrl: '/components/amazon/amazon.html',
    controller: 'AmazonController',
    bindings: {
        slide: '<',
        module: '='
    }
});
