(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('institutions.institution.comments', {
                    url:'/comments',
                    templateUrl: 'institutions-state/institution-state/comments-state/comments.view.html',
                    controller: 'InstitutionCommentsController',
                    controllerAs: 'vm'
                })
        }])
})();