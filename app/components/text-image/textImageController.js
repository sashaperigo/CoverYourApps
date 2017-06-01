'use strict';

myApp.controller('textImageController', ['$scope',
    function($scope) {
    }
]);

myApp.component('textImage', {
    templateUrl: '/components/text-image/textImage.html',
    controller: 'textImageController',
    bindings: {
        slide: '<'
    }
});
