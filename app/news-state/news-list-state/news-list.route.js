(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('news.news-list', {
                    url:'/news-list',
                    templateUrl: 'news-state/news-list-state/news-list.view.html',
                    controller: 'NewsListController',
                    controllerAs: 'vm'
                })
        }])
})();