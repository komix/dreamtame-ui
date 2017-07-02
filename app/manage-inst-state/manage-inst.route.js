(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('manage-inst', {
                    url:'/manage-inst?id',
                    templateUrl: 'manage-inst-state/manage-inst.view.html',
                    controller: 'ManageInstController',
                    controllerAs: 'vm',
                    permissions: {
                        only: 'isAuthorized'
                    }
                })
        }])
})();