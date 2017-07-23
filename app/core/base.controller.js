(function () {
    'use strict';

    angular
        .module('app')
        .controller('BaseController', BaseController);

    BaseController.$inject = ['$state', 'users', '$rootScope', 'routerHelper'];
    /* @ngInject */
    function BaseController($state, users, $rootScope, routerHelper) {
        var vm = this;

        vm.users = users;
        vm.isStateAvailable = isStateAvailable;
        vm.logout = logout;
        vm.isLoggedIn = isLoggedIn;
        vm.isStateActive = isStateActive;

        activate();

        function activate() {
            $rootScope.$on('token-invalid', function(){
                users.logout();
            });
        }

        function logout() {
            users.logout();
        }

        function isStateAvailable(stateName) {
            return routerHelper.isStateAvailable(stateName);
        }

        function isLoggedIn() {
            return users.current && users.current.role !== 'guest';
        }

        function isStateActive(name) {
            if (!$state.current || !$state.current.name) { return false; }
            return $state.current.name.includes(name);
        }
    }
})();

