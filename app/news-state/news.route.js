(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('news', {
                    url:'/news',
                    templateUrl: 'news-state/news.view.html',
                    controller: 'NewsController',
                    controllerAs: 'vm',
                    permissions: {
                        only: 'abstractState'
                    },
                    redirectTo: ['news.news-list']
                })
        }])
})();