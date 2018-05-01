(function () {
    'use strict';
    angular
        .module('app')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['$rootScope', '$stateParams', '$window', '$scope', 'users'];

    function SignInController($rootScope, $stateParams, $window, $scope, users) {
        var vm = this;

        vm.submit = submit;
        vm.resetErrors = resetErrors;
        vm.isFormVisible = isFormVisible;

        vm.user = {};


        activate();

        function activate() {
            if ($stateParams.fromservice) {
                initFb();
                vm.isLoadInProcess = true;
            }

            var listener = $rootScope.$on('token-invalid', function() {
                vm.errorMessage = 'Неправильний логін або пароль.'
            });

            $scope.$on('$destroy', function() {
                listener();
            })
        }

        function initFb() {
            $window.fbAsyncInit = function() {
                // Executed when the SDK is loaded
                FB.init({
                    appId: '1755870721388469',
                    channelUrl: 'login-state/auth-providers/channel.html',
                    status: true,
                    cookie: true,
                    xfbml: true
                });

                users.watchFacebookAuthChange();
            };
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
