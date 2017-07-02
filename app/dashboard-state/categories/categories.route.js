(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.categories', {
                    url:'/categories',
                    templateUrl: 'dashboard-state/categories/categories.view.html',
                    controller: 'DashboardCategoriesController',
                    controllerAs: 'vm',
                    permissions: {
                        only: 'seeDashboard'
                    }
                })
        }])
})();