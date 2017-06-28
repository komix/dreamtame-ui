(function () {
    'use strict';

    angular
        .module('app')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['users'];

    function SignUpController(users) {
        var vm = this;

        vm.submit = submit;

        function submit() {
            user.login(vm.user);
        }
    }

})();