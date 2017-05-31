'use strict';

var SketchyHttpsController = myApp.controller('SketchyHttpsController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        $scope.sketchyHttps = {};
    }
]);

myApp.component('sketchyHttps', {
    templateUrl: '/components/sketchy-https/sketchyHttps.html',
    controller: 'SketchyHttpsController',
    bindings: {
        module: '<' //= to make two-way binded
    }
});
