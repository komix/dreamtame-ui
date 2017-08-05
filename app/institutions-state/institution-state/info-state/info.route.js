(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('institutions.institution.info', {
                    url:'/info',
                    templateUrl: 'institutions-state/institution-state/info-state/info.view.html',
                    controller: 'InstitutionInfoController',
                    controllerAs: 'vm'
                })
        }])
})();