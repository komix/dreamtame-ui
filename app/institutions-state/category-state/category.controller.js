(function () {
    'use strict';
    angular
        .module('app')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$stateParams', '$rootScope', 'InstitutionsList', 'categoriesService'];

    function CategoryController($stateParams, $rootScope, InstitutionsList, categoriesService) {
        var vm = this;

        var catId = parseInt($stateParams.id);
        vm.institutions = new InstitutionsList({categoryId: catId});
        vm.loadMoreInstitutions = loadMoreInstitutions;

        activate();

        function activate() {
            categoriesService.activeId = catId;
            vm.institutions.getRemote();
            emitActiveCatChangeEvent(catId);
        }

        function loadMoreInstitutions() {
            if (vm.institutions.allInstitutionsLoaded || vm.institutions.isLoadInProcess) {
                return false;
            }

            vm.institutions.getRemote();
        }

        function emitActiveCatChangeEvent(catId) {
            $rootScope.$emit('activeCatChange', catId);
        }


    }

})();
