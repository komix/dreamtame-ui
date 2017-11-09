(function () {
    'use strict';

    angular
        .module('app')
        .controller('ConfirmEmailController', ConfirmEmailController);

    ConfirmEmailController.$inject = ['$stateParams', 'users'];

    function ConfirmEmailController($stateParams, users) {
        var vm = this;

        activate();

        function activate() {
           activateUser();
        }

        function activateUser() {
            if (!$stateParams.token) { return false; }

            vm.isLoadInProcess = true;

            users.activate($stateParams.token)
                .catch(function(err) {
                    if (err && err.data && err.data.code === 404) {
                        vm.errorMessage = "Посилання на підтвердження електронної адреси застаріло або недійсне.";
                    }
                })
                .finally(function() {
                    vm.isLoadInProcess = false;
                })
        }

    }

})();