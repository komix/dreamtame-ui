(function () {
    'use strict';

    angular
        .module('app')
        .controller('RestorePasswordController', RestorePasswordController);

    RestorePasswordController.$inject = ['$stateParams', 'users'];

    function RestorePasswordController($stateParams, users) {
        var vm = this;

        var token = $stateParams.token;

        vm.password = {};

        vm.submit = submit;

        function submit() {
            if (vm.password.original !== vm.password.confirmation) {
                vm.errorMessage = 'Паролі не збігаються.'
                return false;
            }

            users.restorePassword({
                    token: token,
                    password: vm.password.original
                })
                .catch(function(err) {
                    if (err && err.data && err.data.code) {
                        vm.errorMessage = 'Посилання на відновдення паролю недійсне або вже використане.'
                    }
                })
                .then(function(response) {
                    if (!response) { return false; }

                    if (response && response.data && response.data.success) {
                        vm.successMessage = 'Ви успішно змінили свій пароль.';
                    }
                })
        }

    }

})();