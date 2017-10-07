(function () {
    'use strict';
    angular
        .module('app')
        .controller('DashboardNewsController', DashboardNewsController);

    DashboardNewsController.$inject = ['ArticlesList'];

    function DashboardNewsController(ArticlesList) {
        var vm = this;

        vm.news = new ArticlesList();

        activate();

        function activate() {
            vm.news.getRemote();
        }
    }
})();


