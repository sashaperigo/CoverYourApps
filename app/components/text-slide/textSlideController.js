'use strict';

myApp.controller('textSlideController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
    }
]);

myApp.component('textSlide', {
    templateUrl: '/components/text-slide/textSlide.html',
    controller: 'textSlideController',
    bindings: {
        slide: '<'
    }
});
