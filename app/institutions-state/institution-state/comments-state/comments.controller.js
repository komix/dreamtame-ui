(function () {
    'use strict';
    angular
        .module('app')
        .controller('InstitutionCommentsController', InstitutionCommentsController);

    InstitutionCommentsController.$inject = ['$stateParams', 'instService'];

    function InstitutionCommentsController($stateParams, instService) {
        var vm = this;

        var instId = $stateParams.id;

        activate();

        function activate() {
            getInstitution();
        }

        function getInstitution() {
            instService.get(instId).then(function(response) {
                vm.institution = response.data;
                vm.options = { institution: vm.institution };
            });
        }

    }

})();

