(function () {
    'use strict';
    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$stateParams'];

    function SearchController($stateParams) {
        var vm = this;

        vm.searchConfig = {
            address: $stateParams.address || null,
            radius: parseInt($stateParams.radius) || 1,
            categoryId: $stateParams.categoryId
        };

        activate();

        function activate() {

        }



    }

})();

