(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('news.article', {
                    url:'/article/:id',
                    templateUrl: 'news-state/article-state/article.view.html',
                    controller: 'ArticleController',
                    controllerAs: 'vm'
                })
        }])
})();