(function () {
    'use strict';
    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['ArticlesList', 'InstitutionsList'];

    function HomeController(ArticlesList, InstitutionsList) {
        var vm = this;

        vm.freeSearchConfig = {
            addressOnly: true
        };


        vm.news = new ArticlesList({limit: 3});
        vm.institutions = new InstitutionsList({limit: 5});

        activate();

        function activate() {
            vm.news.getRemote();
            vm.institutions.getRemote();
        }
    }
})();


