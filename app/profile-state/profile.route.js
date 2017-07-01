(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('profile', {
                    url:'/profile/:id',
                    templateUrl: 'profile-state/profile.view.html',
                    controller: 'ProfileController',
                    controllerAs: 'vm',
                    permissions: {
                        only: 'isAuthorized'
                    }
                })
        }])
})();