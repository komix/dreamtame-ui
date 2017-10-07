(function () {
    'use strict';

    angular
        .module('app')
        .controller('BaseController', BaseController);

    BaseController.$inject = ['$state', 'users', '$rootScope', 'routerHelper'];
    /* @ngInject */
    function BaseController($state, users, $rootScope, routerHelper) {
        var vm = this;

        var states = [
            {
                ukName: 'Головна',
                name: 'home'
            },
            {
                ukName: 'Про проект',
                name: 'about'
            },
            {
                ukName: 'Секції',
                name: 'institutions'
            },
            {
                ukName: 'Профіль',
                name: 'profile',
                params: {
                    id: users.current ? users.current.id : null
                }
            },
            {
                ukName: 'Новини',
                name: 'news'
            },
            {
                ukName: 'Адмінка',
                name: 'dashboard'
            }
        ];

        vm.users = users;
        vm.states = states;
        vm.isStateAvailable = isStateAvailable;
        vm.logout = logout;
        vm.isLoggedIn = isLoggedIn;
        vm.isStateActive = isStateActive;
        vm.getStateHref = getStateHref;



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

        function getStateHref(state) {
            return $state.href(state.name, state.params);
        }
    }
})();

