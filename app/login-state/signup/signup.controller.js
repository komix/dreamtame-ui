(function () {
    'use strict';
    angular
        .module('app')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['users'];

    function SignUpController(users) {
        var vm = this;

        vm.submit = submit;
        vm.resetErrors = resetErrors;
        vm.isFormVisible = isFormVisible;

        vm.credentials = {};
        vm.isLoadInProcess = false;

        function submit() {
            vm.form.$setDirty();

            _.each(vm.form.$error.required, function(elem) {
                elem.$setDirty();
                elem.$setTouched();
            });

            if (!vm.form.$valid) { return false; }

            if (vm.credentials.password !== vm.credentials.passwordConfirm) {
                vm.errorMessage = 'Паролі не збігаються.';
                return false;
            }

            vm.isLoadInProcess = true;

            users.signup({
                    email: vm.credentials.email,
                    plainPassword: vm.credentials.password
                })
                .catch(function(err) {
                    if (err && err.data && err.data.message === 'user already exists') {
                        vm.errorMessage = 'Користувач з такою електронною адресою вже існує, скористайтесь формою відновлення паролю.';
                    }
                })
                .then(function(response) {
                    if (response && response.data.code === 200) {
                        vm.successMessage = 'Підтвердіть свій email перейшовши за посиланням, яке ми щойно Вам відправили.';
                    }
                })
                .finally(function() {
                    vm.isLoadInProcess = false;
                })
        }

        function resetErrors() {
            vm.errorMessage = '';
            vm.form.$setPristine();
        }

        function isFormVisible() {
            return !vm.successMessage && !vm.isLoadInProcess;
        }
    }
})();
