(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider) {
            $stateProvider
                .state('search', {
                    url:'/search?categoryId&lat&lng&address&recruitFrom&recruitTo&radius',
                    templateUrl: 'search-state/search-state.view.html',
                    controller: 'SearchController',
                    controllerAs: 'vm'
                })
        }])
})();