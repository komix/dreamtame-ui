(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['users'];

    function LoginController(users) {
        var vm = this;

        vm.submit = submit;

        // delete this
        vm.user = {};
        vm.user.name = 'komixdbz@gmail.com';
        vm.user.password = 'qwertyui';

        function submit() {
            users.login(vm.user);
        }
    }

})();