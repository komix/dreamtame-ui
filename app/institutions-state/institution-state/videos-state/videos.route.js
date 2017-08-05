(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('institutions.institution.videos', {
                    url:'/videos',
                    templateUrl: 'institutions-state/institution-state/videos-state/videos.view.html',
                    controller: 'InstitutionVideosController',
                    controllerAs: 'vm'
                })
        }])
})();