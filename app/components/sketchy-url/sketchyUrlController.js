'use strict';

var SketchyUrlController = myApp.controller('SketchyUrlController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        $scope.sketchyUrl = {};
        $scope.sketchyUrl.name = "Hi!";
        console.log('loaded sketchyurl');
        console.log($scope.main);
    }
]);

myApp.component('sketchyUrl', {
    templateUrl: '/components/sketchy-url/sketchyUrl.html',
    controller: 'SketchyUrlController',
    bindings: {
        module: '<'
    }
});
