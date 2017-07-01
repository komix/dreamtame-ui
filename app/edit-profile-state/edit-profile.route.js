(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('edit-profile', {
                    url:'/edit-profile/:id',
                    templateUrl: 'edit-profile-state/edit-profile.view.html',
                    controller: 'EditProfileController',
                    controllerAs: 'vm',
                    permissions: {
                        only: 'isAuthorized'
                    }
                })
        }])
})();