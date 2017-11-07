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

        vm.user = {};
        vm.user.name = 'test@mail.com';
        vm.user.password = 'password';


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

            users.login(vm.user);
        }

        function resetErrors() {
            vm.errorMessage = '';
        }
    }
})();
