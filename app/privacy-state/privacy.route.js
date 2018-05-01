(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('privacy', {
                    url:'/privacy-policy',
                    templateUrl: 'privacy-state/privacy.view.html',
                    controller: 'PrivacyController',
                    controllerAs: 'vm'
                })
        }])
})();