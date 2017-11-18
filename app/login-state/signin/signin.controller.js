(function () {
    'use strict';
    angular
        .module('app')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['$rootScope', '$scope', 'users'];

    function SignInController($rootScope, $scope, users) {
        var vm = this;

        vm.submit = submit;
        vm.resetErrors = resetErrors;
        vm.isFormVisible = isFormVisible;

        vm.user = {};


        activate();

        function activate() {
            var listener = $rootScope.$on('token-invalid', function() {
                vm.errorMessage = 'Неправильний логін або пароль.'
            });

            $scope.$on('$destroy', function() {
                listener();
            })
        }


        function submit() {
            vm.form.$setDirty();
            _.each(vm.form.$error.required, function(elem) {
                elem.$setDirty();
                elem.$setTouched();
            });

            if (!vm.form.$valid) { return false; }

            vm.isLoadInProcess = true;

            users.login(vm.user)
                .catch(function(err) {
                    if (err && err.data && err.data.code === 401) {
                        vm.errorMessage = 'Неправильний логін або пароль.';
                    }
                })
                .finally(function() {
                    vm.isLoadInProcess = false;
                });
        }

        function resetErrors() {
            vm.errorMessage = '';
        }

        function isFormVisible() {
            return !vm.isLoadInProcess;
        }
    }
})();
