(function () {
    'use strict';

    angular
        .module('app')
        .controller('RecruitAgeModalController', RecruitAgeModalController);


    RecruitAgeModalController.$inject = ['$rootScope', 'institution', '$uibModalStack', 'instService'];

    function RecruitAgeModalController($rootScope, institution, $uibModalStack, instService) {
        var vm = this;

        var MIN_AGE = 0;
        var MAX_AGE = 102;

        vm.institution = institution;
        vm.recruitFrom = institution.recruitFrom;
        vm.recruitTo = institution.recruitTo;
        vm.fromUnlimited = false;
        vm.toUnlimited = false;

        vm.submit = submit;

        activate();

        function activate() {

        }

        function submit() {
            _.each(vm.reqruitform.$error.required, function(elem) {
                elem.$setDirty();
            });

            if (!vm.reqruitform.$valid) { return false; }

            if (vm.fromUnlimited) {
                vm.recruitFrom = MIN_AGE;
            }

            if (vm.toUnlimited) {
                vm.recruitTo = MAX_AGE;
            }

            var recruitAge = {
                recruitFrom: vm.recruitFrom,
                recruitTo: vm.recruitTo
            };

            instService.setRecruitAge(vm.institution.id, recruitAge).then(function(response) {
                vm.institution.recruitFrom = vm.recruitFrom;
                vm.institution.recruitTo = vm.recruitTo;
                $uibModalStack.dismissAll();
            })
        }

    }

})();