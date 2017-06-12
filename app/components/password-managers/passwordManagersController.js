var PasswordManagersController = myApp.controller('PasswordManagersController', ['$scope', '$rootScope', '$location', '$http',
    function($scope, $rootScope, $location, $http) {
        $scope.passwordManagers = {};
        $scope.passwordManagers.list = [{
        	"name": "1Password",
        	"imgSrc": "img/etc/1password-logo.png",
        	"url": "https://1password.com/"
        }, {
        	"name": "Dashlane",
        	"imgSrc": "img/etc/dashlane-logo.jpg",
        	"url": "https://www.dashlane.com/"
        }, {
        	"name": "KeePassX",
        	"imgSrc": "img/etc/keeppassx-logo.jpg",
        	"url": "https://www.keepassx.org/"
        }, {
        	"name": "LastPass",
        	"imgSrc": "img/etc/lastpass-logo.png",
        	"url": "https://www.lastpass.com/"
        }];
    }
]);

myApp.component('passwordManagers', {
    templateUrl: '/components/password-managers/passwordManagers.html',
    controller: 'PasswordManagersController',
    bindings: {
        slide: '<'
    }
});
