(function () {
    'use strict';

    angular
        .module('app')
        .controller('ManagePhoneNumberModalController', ManagePhoneNumberModalController);

    ManagePhoneNumberModalController.$inject = ['$rootScope', '$timeout', '$uibModalStack', 'options', 'instService'];

    function ManagePhoneNumberModalController($rootScope, $timeout, $uibModalStack, options, instService) {
        var vm = this;

        var PHONE_LENGTH = 19;

        vm.isEditState = false;

        vm.submit = submit;
        vm.remove = remove;

        activate();

        function activate() {
            $timeout(setInputMask);

            if (options && options.phoneNumber) {
                vm.rawNumber = options.phoneNumber.rawNumber;
                vm.isEditState = true;
            } else {
                vm.rawNumber = '';
            }

            setModalTitles();
        }

        function setInputMask() {
            var numberInput = $('#manage-phone-number-input');
            numberInput.mask("+38 (999) 999-99-99", {placeholder: "  "});
        }

        function setModalTitles() {
            if (vm.isEditState) {
                vm.modalTitle = 'Редагувати номер';
                vm.actionTitle = 'Редактуйте номер:'
            } else {
                vm.modalTitle = 'Додати номер';
                vm.actionTitle = 'Введіть номер:'
            }
        }

        function submit() {
            if (vm.rawNumber.length !== PHONE_LENGTH) { return false; }
            vm.isLoadInProcess = true;

            getPromise()
                .then(function(response) {
                    $uibModalStack.dismissAll();
                    $rootScope.$emit('phone-number-added', {data: response.data})
                })
                .finally(function() {
                    vm.isLoadInProcess = false;
                })
        }

        function getPromise() {
            var promise;

            var numberOptions = {
                rawNumber: vm.rawNumber,
                institutionId: options.institution.id
            };

            if (vm.isEditState) {
                promise = instService.editPhoneNumber(options.phoneNumber.id, numberOptions)
            } else {
                promise = instService.addPhoneNumber(numberOptions)
            }

            return promise;
        }

        function remove() {
            instService.removePhoneNumber(options.phoneNumber.id).then(function() {
                $uibModalStack.dismissAll();
                $rootScope.$emit('phone-number-deleted', {id: options.phoneNumber.id});
            })
        }


    }

})();