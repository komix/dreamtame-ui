(function () {
    'use strict';
    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', 'ArticlesList', 'InstitutionsList', 'routerHelper'];

    function HomeController($state, ArticlesList, InstitutionsList, routerHelper) {
        var vm = this;

        vm.freeSearchConfig = {
            addressOnly: true
        };

        vm.news = new ArticlesList({limit: 3});
        vm.institutions = new InstitutionsList({limit: 5});

        vm.goToCreateState = goToCreateState;

        activate();

        function activate() {
            vm.news.getRemote();
            vm.institutions.getRemote();
        }

        function goToCreateState() {
            if (routerHelper.isStateAvailable('manage-inst')) {
                return $state.go('manage-inst');
            } else {
                return $state.go('login.signup');
            }
        }
    }
})();


