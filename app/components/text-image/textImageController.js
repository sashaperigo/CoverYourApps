'use strict';

myApp.controller('textImageController', ['$scope', '$sce',
    function($scope, $sce) {
    	var ctrl = this;
        $scope.slideText = $sce.trustAsHtml(ctrl.slide.text);
    }
]);

myApp.component('textImage', {
    templateUrl: '/components/text-image/textImage.html',
    controller: 'textImageController',
    bindings: {
        slide: '<'
    }
});
