'use strict';

myApp.controller('ReplyController', ['$scope', '$rootScope', '$mdDialog',
    function($scope, $rootScope, $mdDialog) {
        // Get email data
        $scope.email = this.email;
        $scope.phone = '';
        if ($scope.email.emailData.subject === "Larry Pressler") {
            $scope.phone = 'My phone number is 202-555-8323.';
        }

        // successfully perform action
        $scope.sendEmail = function() {
            $mdDialog.hide();
        }

        // user did not actually perform action
        $scope.close = function() {
            $mdDialog.cancel();
        }
    }
]);

myApp.component('reply', {
    templateUrl: '/components/reply/reply.html',
    controller: 'replyController',
    bindings: {
        slide: '<',
        module: '='
    }
});
