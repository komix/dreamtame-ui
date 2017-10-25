(function () {
    'use strict';
    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['ArticlesList'];

    function HomeController(ArticlesList) {
        var vm = this;


        vm.news = new ArticlesList();

        activate();

        function activate() {
            vm.news.getRemote();
        }
    }
})();


