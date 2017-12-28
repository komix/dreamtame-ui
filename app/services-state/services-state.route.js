(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider) {
            $stateProvider
                .state('services', {
                    url:'/services',
                    templateUrl: 'services-state/services-state.view.html',
                    controller: 'ServicesController',
                    controllerAs: 'vm'
                })
        }])
})();