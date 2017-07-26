(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('institutions.institution', {
                    url:'/institution/:id?state',
                    templateUrl: 'institutions-state/institution-state/institution.view.html',
                    controller: 'InstitutionController',
                    controllerAs: 'vm'
                })
        }])
})();