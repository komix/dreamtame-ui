(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('institutions.institution.photos', {
                    url:'/photos',
                    templateUrl: 'institutions-state/institution-state/photos-state/photos.view.html',
                    controller: 'InstitutionPhotosController',
                    controllerAs: 'vm'
                })
        }])
})();