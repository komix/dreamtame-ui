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

    PhoneNumbersController.$inject = ['$rootScope', 'modalService', 'users'];

    function PhoneNumbersController($rootScope, modalService, users) {
        var vm = this;

        vm.openAddPhoneNumberModal = openAddPhoneNumberModal;
        vm.isOwner = isOwner;

        activate();

        function activate() {
            $rootScope.$on('phone-number-deleted', function(event, params) {
                if (params.id) {
                    var itemToRemove = _.find(vm.options.institution.phoneNumbers, function(elem) {
                        return elem.id === params.id;
                    });
                    var index = _.indexOf(vm.options.institution.phoneNumbers, itemToRemove);
                    if (index === -1) { return false; }

                    vm.options.institution.phoneNumbers.splice(index, 1);
                }
            });

            $rootScope.$on('phone-number-added', function(event, params) {
                if (params.data && params.data.id) {
                    vm.options.institution.phoneNumbers.push(params.data);
                }
            });
        }

        function openAddPhoneNumberModal(phoneNumber) {
            modalService.showManagePhoneNumberModal({
                phoneNumber: phoneNumber,
                institution: vm.options.institution
            });
        }

        function isOwner() {
            if (!vm.options.institution || !users.current) { return false }

            var isOwner = parseInt(vm.options.institution.owner) === parseInt(users.current.id);
            var isAdmin = users.current.role === 'admin' || users.current.role === 'superman';

            return isAdmin || isOwner;

        }


    }

})();