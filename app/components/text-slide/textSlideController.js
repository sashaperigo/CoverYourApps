'use strict';

myApp.controller('textSlideController', ['$scope', '$sce',
    function($scope, $sce) {
        var ctrl = this;
        $scope.slideText = $sce.trustAsHtml(ctrl.slide.text);
    }
]);

myApp.component('textSlide', {
    templateUrl: '/components/text-slide/textSlide.html',
    controller: 'textSlideController',
    bindings: {
        slide: '<'
    }
});
