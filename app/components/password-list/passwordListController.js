var PasswordListController = myApp.controller('PasswordListController', ['$scope', '$rootScope', '$location', '$http',
    function($scope, $rootScope, $location, $http) {
    	$scope.passwordList = {};

    	$scope.passwordList.list = [
    		"password1",
    		"password2",
    		"password3",
    		"password4",
    		"password5",
    		"password6",
    		"password7",
    		"password8",
    		"password9",
    		"password10"
    	];
    }
]);

myApp.component('passwordList', {
    templateUrl: '/components/password-list/passwordList.html',
    controller: 'PasswordListController',
    bindings: {
        slide: '<'
    }
});
