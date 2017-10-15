(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('institutions.all-state', {
                    url:'/all',
                    templateUrl: 'institutions-state/all-state/all-state.view.html',
                    controller: 'AllStateController',
                    controllerAs: 'vm'
                })
        }])
})();