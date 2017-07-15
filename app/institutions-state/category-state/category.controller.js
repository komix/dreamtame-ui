(function () {
    'use strict';
    angular
        .module('app')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$stateParams', 'users', 'instService'];

    function CategoryController($stateParams, users, instService) {
        var vm = this;

        var catId = $stateParams.id;

        activate();

        function activate() {
            getInstitutions();
        }

        function getInstitutions() {
            instService.getByCategoryId(catId).then(function(response) {
                vm.institutions = response.data;
            });
        }


    }

})();
