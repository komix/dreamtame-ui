(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['users'];

    function LoginController(users) {
        var vm = this;

        vm.submit = submit;

        function submit() {
            users.login(vm.user);
        }
    }

})();