(function () {
    'use strict';

    angular
        .module('app')
        .controller('BaseController', BaseController);

    BaseController.$inject = ['users', '$rootScope'];
    /* @ngInject */
    function BaseController(users, $rootScope) {
        var vm = this;

        vm.users = users;

        activate();

        function activate() {
            $rootScope.$on('token-invalid', function(){
                users.logout();
            });
        }
    }
})();

