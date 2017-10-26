(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('search.default-state', {
                    url:'/default',
                    templateUrl: 'search-state/default-state/default-state.view.html',
                    controller: 'DefaultStateController',
                    controllerAs: 'vm'
                })
        }])
})();