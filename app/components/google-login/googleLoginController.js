'use strict';

var GoogleLogin = myApp.controller('GoogleLoginController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        $scope.googleLogin = {};
        $scope.googleLogin.username = '';
        $scope.googleLogin.error = false;

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
