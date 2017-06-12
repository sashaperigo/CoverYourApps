'use strict';

var GoogleLogin = myApp.controller('GoogleLoginController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        $scope.googleLogin = {};
        $scope.googleLogin.oldPW = "chillary";
        $scope.googleLogin.newPW = "";
        $scope.googleLogin.confirmNewPW = "";
        $scope.index = 0;
        $scope.googleLogin.username = '';
        $scope.googleLogin.error = false;

        $scope.googleLogin.enterOld = function() {
            if ($scope.googleLogin.oldPW === "chillary") {
                $scope.googleLogin.error = false;
                $scope.index++;
            } else {
                $scope.googleLogin.error = true;
            }
        };
        $scope.googleLogin.enterNew = function() {
            if ($scope.googleLogin.newPW === $scope.googleLogin.confirmNewPW) {
                $scope.googleLogin.error = false;
                $scope.index++;
            } else {
                $scope.googleLogin.error = true;
            }
        };

        $scope.googleLogin.login = function() {
            if ($scope.googleLogin.username === '') {
                $scope.googleLogin.error = true;
            } else {
                $scope.googleLogin.error = true;
            }
        };
    }
]);

myApp.component('googleLogin', {
    templateUrl: '/components/google-login/googleLogin.html',
    controller: 'GoogleLoginController',
    bindings: {
        slide: '<',
        module: '='
    }
});
