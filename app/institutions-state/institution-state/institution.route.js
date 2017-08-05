(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('institutions.institution', {
                    url:'/institution/:id',
                    templateUrl: 'institutions-state/institution-state/institution.view.html',
                    controller: 'InstitutionController',
                    controllerAs: 'vm'
                })
        }])
})();