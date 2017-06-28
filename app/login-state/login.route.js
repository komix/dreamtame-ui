(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('login', {
                    url:'/login',
                    templateUrl: 'login-state/login.view.html',
                    controller: 'LoginController',
                    controllerAs: 'vm'
                })
        }])
})();