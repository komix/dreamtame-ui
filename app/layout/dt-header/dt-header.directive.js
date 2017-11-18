(function() {
    'use strict';

    angular
        .module('app')
        .directive('dtHeader', dtHeader);

    dtHeader.$inject = [];
    /* @ngInject */
    function dtHeader() {
        var directive = {
            bindToController: true,
            controller: DtHeaderController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'layout/dt-header/dt-header.view.html',
            scope: {
                config: '=?'
            }
        };

        return directive;
    }

    DtHeaderController.$inject = ['$element', '$rootScope', '$scope', '$state', 'users', 'routerHelper'];
    /* @ngInject */
    function DtHeaderController($element, $rootScope, $scope, $state, users, routerHelper) {
        var vm = this;

        vm.users = users;
        vm.states = [];
        vm.isExpanded = false;

        vm.isStateAvailable = isStateAvailable;
        vm.logout = logout;
        vm.isLoggedIn = isLoggedIn;
        vm.isStateActive = isStateActive;
        vm.getStateHref = getStateHref;
        vm.toggleExpansion = toggleExpansion;
        vm.getCurrentUserId = getCurrentUserId;
        vm.collapseNavigation = collapseNavigation;


        activate();

        function activate() {
            updateStates();

            $rootScope.$on('user-logged-in', function(){
                updateStates();
            });
        }

        function toggleExpansion() {
            vm.isExpanded = !vm.isExpanded;
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

        function getCurrentUserId() {
            return users.current && users.current.id;
        }

        function collapseNavigation() {
            vm.isExpanded = false;
        }

        function updateStates() {
            var statesList = [
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
                    name: 'institutions.all-state'
                },
                {
                    ukName: 'Пошук',
                    name: 'search.default-state'
                },
                {
                    ukName: 'Профіль',
                    name: 'profile',
                    narrowOnly: true,
                    params: {
                        id: users.current ? users.current.id : null
                    }
                },
                {
                    ukName: 'Новини',
                    name: 'news.news-list'
                },
                {
                    ukName: 'Адмінка',
                    name: 'dashboard'
                }
            ];

            vm.states.length = 0;

            _.each(statesList, function(elem) {
                vm.states.push(elem);
            })
        }
    }
})();