(function () {
    'use strict';
    angular
        .module('app')
        .controller('InstitutionInfoController', InstitutionInfoController);

    InstitutionInfoController.$inject = ['$stateParams', 'modalService', 'WorkingDays'];

    function InstitutionInfoController($stateParams, modalService, WorkingDays) {
        var vm = this;

        var instId = $stateParams.id;
        vm.workingDays = new WorkingDays({institutionId: instId});

        activate();

        function activate() {
           vm.workingDays.getRemote();
        }

    }

})();

