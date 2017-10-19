(function () {
    'use strict';

    angular
        .module('app')
        .controller('NewsListController', NewsListController);

    NewsListController.$inject = ['ArticlesList'];

    function NewsListController(ArticlesList) {
        var vm = this;

        vm.news = new ArticlesList();

        vm.loadMoreArticles =loadMoreArticles;

        activate();

        function activate() {
            vm.news.getRemote();
        }

        function loadMoreArticles() {
            if (vm.news.allInstitutionsLoaded || vm.news.isLoadInProcess) {
                return false;
            }

            vm.news.getRemote();
        }

    }

})();