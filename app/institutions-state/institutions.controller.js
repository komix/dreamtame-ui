(function () {
    'use strict';
    angular
        .module('app')
        .controller('InstitutionsController', InstitutionsController);

    InstitutionsController.$inject = ['$stateParams'];

    function InstitutionsController($stateParams) {
        var vm = this;

        vm.activeCatId = $stateParams.id;

        activate();

        function activate() {

        }


    }

})();

