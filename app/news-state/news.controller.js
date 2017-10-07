(function () {
    'use strict';

    angular
        .module('app')
        .controller('NewsController', NewsController);

    NewsController.$inject = ['ArticlesList'];

    function NewsController(ArticlesList) {
        var vm = this;

        vm.news = new ArticlesList();

        activate();

        function activate() {
            vm.news.getRemote();
        }

    }

})();