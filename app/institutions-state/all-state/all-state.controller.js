(function () {
    'use strict';
    angular
        .module('app')
        .controller('AllStateController', AllStateController);

    AllStateController.$inject = ['categoriesService'];

    function AllStateController(categoriesService) {
        var vm = this;

        vm.isLoadInProcess = true;

        activate();

        function activate() {
            getCategories();
        }


        function getCategories() {
            return categoriesService.getTree().then(function(response) {
                vm.isLoadInProcess = false;
                vm.categories = response.data;
            });
        }

    }

})();
