(function () {
    'use strict';
    angular
        .module('app')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$stateParams', 'users', 'instService', 'categoriesService'];

    function CategoryController($stateParams, users, instService, categoriesService) {
        var vm = this;

        var catId = parseInt($stateParams.id);

        activate();

        function activate() {
            getInstitutions();
        }

        function getInstitutions() {
            categoriesService.activeId = catId;
            instService.getByCategoryId(catId).then(function(response) {
                vm.institutions = response.data;
            });
        }


    }

})();
