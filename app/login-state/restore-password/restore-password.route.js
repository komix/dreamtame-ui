(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('restore-password', {
                    url:'/restore-password/:token',
                    templateUrl: 'login-state/restore-password/restore-password.view.html',
                    controller: 'RestorePasswordController',
                    controllerAs: 'vm',
                    permissions: {
                        except: 'isAuthorized'
                    }
                })
        }])
})();