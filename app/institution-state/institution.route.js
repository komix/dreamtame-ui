(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('institution', {
                    url:'/institution/:id',
                    templateUrl: 'institution-state/institution.view.html',
                    controller: 'InstitutionController',
                    controllerAs: 'vm'
                })
        }])
})();