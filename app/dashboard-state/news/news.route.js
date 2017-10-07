(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.news', {
                    url:'/news',
                    templateUrl: 'dashboard-state/news/news.view.html',
                    controller: 'DashboardNewsController',
                    controllerAs: 'vm',
                    permissions: {
                        only: 'seeDashboard'
                    }
                })
        }])
})();