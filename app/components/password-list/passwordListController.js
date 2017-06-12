var PasswordListController = myApp.controller('PasswordListController', ['$scope', '$rootScope', '$location', '$http',
    function($scope, $rootScope, $location, $http) {
        $scope.passwordList = {};

        $scope.passwordList.list = [
            "123456",
            "123456789",
            "qwerty",
            "12345678",
            "111111",
            "1234567890",
            "1234567",
            "password",
            "123123",
            "987654321",
            "qwertyuiop",
            "mynoob",
            "123321",
            "666666"
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
