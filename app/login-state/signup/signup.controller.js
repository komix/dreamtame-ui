(function () {
    'use strict';
    angular
        .module('app')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['users', 'confirm'];

    function SignUpController(users, confirm) {
        var vm = this;

        vm.submit = submit;
        vm.resetErrors = resetErrors;

        vm.credentials = {};

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
                    var message = 'Підтвердіть свій email перейшовши за посиланням, яке ми щойно Вам відправили.';
                    confirm.open(message);
                }
            })
        }

        function resetErrors() {
            console.log(vm.form);
            vm.errorMessage = '';
            vm.form.$setPristine();
        }
    }
})();
