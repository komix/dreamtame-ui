(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard.news.manage-article', {
                    url:'/manage-article?id',
                    templateUrl: 'dashboard-state/news/manage-article/manage-article.view.html',
                    controller: 'DashboardManageArticleController',
                    controllerAs: 'vm',
                    permissions: {
                        only: 'seeDashboard'
                    }
                })
        }])
})();