(function () {
    'use strict';

    angular
        .module('app')
        .controller('ForgotPasswordController', ForgotPasswordController);

    ForgotPasswordController.$inject = ['users'];

    function ForgotPasswordController(users) {
        var vm = this;

        vm.credentials = {};

        vm.submit = submit;


        function submit() {
            vm.isLoadInProcess = true;

            users.requestPasswordChange(vm.credentials.email).then(function(response) {
                vm.isLoadInProcess = false;
                if (response && response.data && response.data.success) {
                    vm.successMessage = 'Ми відправили посилання для відновлення пароля на Вашу електронну адресу.';
                }
            })
        }

    }

})();