'use strict';

var ModuleListController = myApp.controller('ModuleListController', ['$scope', '$rootScope',
    function($scope, $rootScope) {}
]);

myApp.component('moduleList', {
    templateUrl: '/components/module-list/moduleList.html',
    controller: ModuleListController,
    bindings: {}
});
