'use strict';

var SketchyUrlController = myApp.controller('SketchyUrlController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        $scope.sketchyUrl = {};
        $scope.sketchyUrl.name = "Hi!";
    }
]);

myApp.component('sketchyUrl', {
    templateUrl: '/components/sketchy-url/sketchyUrl.html',
    controller: SketchyUrlController,
    bindings: {
        module: '<'
    }
});
