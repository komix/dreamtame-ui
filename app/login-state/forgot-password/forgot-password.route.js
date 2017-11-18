(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('forgot-password', {
                    url:'/forgot-password',
                    templateUrl: 'login-state/forgot-password/forgot-password.view.html',
                    controller: 'ForgotPasswordController',
                    controllerAs: 'vm',
                    permissions: {
                        except: 'isAuthorized'
                    }
                })
        }])
})();