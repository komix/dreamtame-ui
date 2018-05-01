(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('login.signin', {
                    url:'/signin?fromservice',
                    templateUrl: 'login-state/signin/signin.view.html',
                    controller: 'SignInController',
                    controllerAs: 'vm'
                })
        }])
})();