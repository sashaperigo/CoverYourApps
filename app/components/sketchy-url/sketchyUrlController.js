'use strict';

var SketchyUrlController = myApp.controller('SketchyUrlController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        $scope.sketchyUrl = {};
    }
]);

myApp.component('sketchyUrl', {
    templateUrl: '/components/sketchy-url/sketchyUrl.html',
    controller: 'SketchyUrlController',
    bindings: {
        module: '<' //= to make two-way binded
    }
});
