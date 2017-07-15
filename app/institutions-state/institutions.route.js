(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('institutions', {
                    url:'/institutions',
                    templateUrl: 'institutions-state/institutions.view.html',
                    controller: 'InstitutionsController',
                    controllerAs: 'vm'
                })
        }])
})();