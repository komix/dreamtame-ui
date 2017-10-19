(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.suggestions.manage-suggestion', {
                    url:'/manage-suggestion?id',
                    templateUrl: 'dashboard-state/suggestions/manage-suggestion/manage-suggestion.view.html',
                    controller: 'DashboardManageSuggestionController',
                    controllerAs: 'vm',
                    permissions: {
                        only: 'seeDashboard'
                    }
                })
        }])
})();