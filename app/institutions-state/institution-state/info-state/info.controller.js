(function () {
    'use strict';
    angular
        .module('app')
        .controller('InstitutionInfoController', InstitutionInfoController);

    InstitutionInfoController.$inject = ['$stateParams', 'users', 'instService', 'modalService', 'Schedules'];

    function InstitutionInfoController($stateParams, users, instService, modalService, Schedules) {
        var vm = this;

        var instId = $stateParams.id;

        vm.scheduleConfig = {};
        vm.phoneNumbersOptions = null;
        vm.isLoadInProcess = true;

        vm.isOwner = isOwner;
        vm.openRecruitAgeModal = openRecruitAgeModal;

        activate();

        function activate() {
            getInst();
        }

        function getInst() {
            vm.isLoadInProcess = true;

            instService.get(instId).then(function(response) {
                vm.institution = response.data;
                vm.schedules = new Schedules({institutionId: instId, ownerId: vm.institution.owner});
                vm.schedules.getRemote().then(function() {
                    vm.isLoadInProcess = false;
                });
                vm.phoneNumbersOptions = {
                    institution: vm.institution
                };
            });
        }

        function isOwner() {
            if (!vm.institution || !users.current) { return false }

            return vm.institution.owner === users.current.id;
        }

        function openRecruitAgeModal() {
            modalService.showRecruitAgeModal(vm.institution);
        }


    }

})();

