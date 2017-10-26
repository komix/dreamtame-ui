(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('search.results-state', {
                    url:'/results?categoryId&lat&lng&address&recruitFrom&recruitTo&radius',
                    templateUrl: 'search-state/results-state/results-state.view.html',
                    controller: 'ResultsStateController',
                    controllerAs: 'vm'
                })
        }])
})();