(function () {
    'use strict';

    angular
        .module('app')
        .controller('NewsListController', NewsListController);

    NewsListController.$inject = ['ArticlesList'];

    function NewsListController(ArticlesList) {
        var vm = this;

        vm.news = new ArticlesList();

        activate();

        function activate() {
            vm.news.getRemote();
        }

    }

})();