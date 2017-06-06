'use strict';

var ModuleListController = myApp.controller('ModuleListController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
    	$scope.moduleList = {};
        $scope.moduleList.modules = [{
            "name": "Passwords",
            "icon": "glyphicon glyphicon-lock",
            "path": "#!/auth",
            "description": "You may have heard that you're supposed to use a different lengthy, password for every website, but who can really remember them all? This course will explain the importance of using strong passwords and offer some tips and tricks for storing your passwords and securing your accounts."
        }, {
            "name": "Email Safety",
            "icon": "glyphicon glyphicon-envelope",
            "path": "#!/phishing",
            "description": "Have you every received an email that looks obviously fake? One way that hackers spread viruses is to disseminate malicious code in links or attachments. This course will teach you some sure fire ways to detect fake emails and protect your computer."
        }];
    }
]);

myApp.component('moduleList', {
    templateUrl: '/components/module-list/moduleList.html',
    controller: ModuleListController,
    bindings: {}
});
