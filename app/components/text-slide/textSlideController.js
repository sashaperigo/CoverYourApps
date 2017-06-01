'use strict';

myApp.controller('textSlideController', ['$scope',
    function($scope) {
    }
]);

myApp.component('textSlide', {
    templateUrl: '/components/text-slide/textSlide.html',
    controller: 'textSlideController',
    bindings: {
        slide: '<'
    }
});
