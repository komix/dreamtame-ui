(function () {
    'use strict';
    angular
        .module('app')
        .controller('InstitutionsController', InstitutionsController);

    InstitutionsController.$inject = ['$stateParams', 'users', 'instService'];

    function InstitutionsController($stateParams, users, instService) {
        var vm = this;

        vm.activeCatId = $stateParams.id;

        activate();

        function activate() {

        }


    }

})();

