(function () {
    'use strict';
    angular
        .module('app')
        .controller('DashboardCategoriesController', DashboardCategoriesController);

    DashboardCategoriesController.$inject = ['$rootScope', 'users', 'categoriesService', 'modalService'];

    function DashboardCategoriesController($rootScope, users, categoriesService, modalService) {
        var vm = this;

        vm.openAddBaseCategoryModal = openAddBaseCategoryModal;

        activate();

        function activate() {
            getTree();

            $rootScope.$on('categories-changed', function () {
                getTree();
            });
        }

        function getTree() {
            categoriesService.getTree().then(function(response) {
                vm.tree = response.data;
            });
        }

        function openAddBaseCategoryModal() {
            var parent = {
                name: 'source',
                id: 1,
                parent: 0
            };
            modalService.showAddCatModal(parent);
        }

    }
})();


