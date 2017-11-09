(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('confirm-email', {
                    url:'/confirm-email/:token',
                    templateUrl: 'login-state/confirm-email/confirm-email.view.html',
                    controller: 'ConfirmEmailController',
                    controllerAs: 'vm',
                    permissions: {
                        except: 'isAuthorized'
                    }
                })
        }])
})();