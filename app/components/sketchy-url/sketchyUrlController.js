'use strict';

var SketchyUrlController = myApp.controller('ModuleListController', ['$scope', '$rootScope',
    function($scope, $rootScope) {}
]);

myApp.component('sketchyUrl', {
    templateUrl: '/components/sketchy-url/sketchyUrl.html',
    controller: SketchyUrlController,
    bindings: {
        module: '<'
    }
});
