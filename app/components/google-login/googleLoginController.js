'use strict';

var GoogleLogin = myApp.controller('GoogleLoginController', ['$scope', '$rootScope',
    function($scope, $rootScope) {}
]);

myApp.component('googleLogin', {
    templateUrl: '/components/google-login/googleLogin.html',
    controller: 'GoogleLoginController',
    bindings: {
        slide: '<',
        module: '='
    }
});
