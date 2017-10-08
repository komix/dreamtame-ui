(function () {
    'use strict';
    angular
        .module('app')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$stateParams', 'users', 'InstitutionsList', 'categoriesService'];

    function CategoryController($stateParams, users, InstitutionsList, categoriesService) {
        var vm = this;

        var catId = parseInt($stateParams.id);
        vm.institutions = new InstitutionsList({categoryId: catId});
        vm.loadMoreInstitutions = loadMoreInstitutions;

        activate();

        function activate() {
            categoriesService.activeId = catId;
            vm.institutions.getRemote();
        }

        function loadMoreInstitutions() {
            if (vm.institutions.allInstitutionsLoaded || vm.institutions.isLoadInProcess) {
                return false;
            }

            vm.institutions.getRemote();
        }


    }

})();
