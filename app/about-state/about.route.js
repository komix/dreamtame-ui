(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('about', {
                    url:'/about',
                    templateUrl: 'about/about.html',
                    controller: 'AboutController',
                    controllerAs: 'vm'
                })
        }])
})();