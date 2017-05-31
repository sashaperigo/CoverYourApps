'use strict';

myApp.controller('textImageController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
    }
]);

myApp.component('textImage', {
    templateUrl: '/components/text-image/textImage.html',
    controller: 'textImageController',
    bindings: {
        slide: '<'
    }
});
