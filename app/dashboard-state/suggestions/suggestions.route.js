(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.suggestions', {
                    url:'/suggestions',
                    templateUrl: 'dashboard-state/suggestions/suggestions.view.html',
                    controller: 'DashboardSuggestionsController',
                    controllerAs: 'vm',
                    permissions: {
                        only: 'seeDashboard'
                    }
                })
        }])
})();