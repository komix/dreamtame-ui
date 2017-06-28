(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('sign-up', {
                    url:'/sign-up',
                    templateUrl: 'signup-state/signup.view.html',
                    controller: 'SignUpController',
                    controllerAs: 'vm'
                })
        }])
})();