(function () {
    'use strict';

    angular
        .module('app')
        .directive('phoneNumbers', phoneNumbers);

    phoneNumbers.$inject = [];
    /* @ngInject */
    function phoneNumbers() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: PhoneNumbersController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'layout/phone-numbers/phone-numbers.html',
            scope: {
                options: '='
            }
        };

        return directive;
    }

    PhoneNumbersController.$inject = ['modalService', 'users'];

    function PhoneNumbersController(modalService, users) {
        var vm = this;

        vm.openAddPhoneNumberModal = openAddPhoneNumberModal;
        vm.isOwner = isOwner;

        activate();

        function activate() {

        }

        function openAddPhoneNumberModal(phoneNumber) {
            modalService.showManagePhoneNumberModal({
                phoneNumber: phoneNumber,
                institution: vm.options.institution
            });
        }

        function isOwner() {
            if (!vm.options.institution || !users.current) { return false }

            return vm.options.institution.owner === users.current.id;
        }


    }

})();