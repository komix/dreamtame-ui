(function () {
    'use strict';
    angular
        .module('app')
        .controller('InstitutionInfoController', InstitutionInfoController);

    InstitutionInfoController.$inject = ['$stateParams', 'users', 'instService', 'modalService', 'WorkingDays'];

    function InstitutionInfoController($stateParams, users, instService, modalService, WorkingDays) {
        var vm = this;

        var instId = $stateParams.id;
        var MIN_AGE = 0;
        var MAX_AGE = 102;

        vm.scheduleConfig = {};

        vm.isOwner = isOwner;
        vm.openRecruitAgeModal = openRecruitAgeModal;
        vm.isFromToAvailable = isFromToAvailable;
        vm.isOnlyFromAvailable = isOnlyFromAvailable;
        vm.isOnlyToAvailable = isOnlyToAvailable;
        vm.isRecruitAgeAvailable = isRecruitAgeAvailable;
        vm.isUnlimited = isUnlimited;
        vm.getRecruitButtonClass = getRecruitButtonClass;

        activate();

        function activate() {
            getInst();
        }

        function getInst() {
            instService.get(instId).then(function(response) {
                vm.institution = response.data;
                vm.workingDays = new WorkingDays({institutionId: instId, ownerId: vm.institution.owner});
                vm.workingDays.getRemote();
            });
        }

        function isOwner() {
            if (!vm.institution || !users.current) { return false }

            return vm.institution.owner === users.current.id;
        }

        function openRecruitAgeModal() {
            modalService.showRecruitAgeModal(vm.institution);
        }

        function isFromToAvailable() {
            if (!vm.institution) { return false }
            return vm.institution.recruitFrom && vm.institution.recruitTo && vm.institution.recruitTo !== MAX_AGE;
        }

        function isOnlyFromAvailable() {
            if (!vm.institution) { return false }
            return vm.institution.recruitFrom && (!vm.institution.recruitTo || vm.institution.recruitTo === MAX_AGE);
        }

        function isOnlyToAvailable() {
            if (!vm.institution) { return false }
            return !vm.institution.recruitFrom && vm.institution.recruitTo && vm.institution.recruitTo !== MAX_AGE;
        }

        function isRecruitAgeAvailable() {
            if (!vm.institution) { return false }
            return _.isNumber(vm.institution.recruitFrom) && _.isNumber(vm.institution.recruitTo);
        }

        function isUnlimited() {
            if (!vm.institution) { return false }
            return vm.institution.recruitFrom === MIN_AGE && vm.institution.recruitTo === MAX_AGE;
        }

        function getRecruitButtonClass() {
            return isRecruitAgeAvailable() ? 'fa-pencil' : 'fa-plus'
        }
    }

})();

