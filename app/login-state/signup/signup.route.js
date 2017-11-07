(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('login.signup', {
                    url:'/signup',
                    templateUrl: 'login-state/signup/signup.view.html',
                    controller: 'SignUpController',
                    controllerAs: 'vm'
                })
        }])
})();