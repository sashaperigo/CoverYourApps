'use strict';

var SketchyHttpsController = myApp.controller('SketchyHttpsController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        $scope.sketchyHttps = {};
    }
]);

myApp.component('sketchyHttps', {
    templateUrl: '/components/sketchy-url/sketchyHttps.html',
    controller: 'SketchyHttps',
    bindings: {
        module: '<' //= to make two-way binded
    }
});
