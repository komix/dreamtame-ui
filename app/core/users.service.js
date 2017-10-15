(function() {
    'use strict';

    angular
        .module('app')
        .factory('users', users);

    users.$inject = ['$state', '$rootScope', 'dtApi', 'User', 'permissions', '$uibModalStack', '$localStorage'];

    function users($state, $rootScope, dtApi, User, permissions, $uibModalStack, $localStorage) {

        var service = {
            current: null,
            permissions: null,
            defaultState: null,
            authorize: authorize,
            login: login,
            logout: logout,
            getUser: getUser,
            update: update,
            isPermissionAvailable: isPermissionAvailable
        };

        return service;

        function authorize() {
            var user = $localStorage.user || {role: 'guest'};

            user.eventHandlers = {
                onLoaded: onLoaded,
                onLoggedOut: onLoggedOut
            };

            try {
                if (user) {
                    service.current = new User(user);
                    loadPermissions();
                    setDefaultState();
                } else {
                    $state.go('home');
                }
            } catch (e) {
                onLoggedOut();
            }
        }

        function login(credentials) {
            service.current.login(credentials);
        }

        function logout() {
            service.current.logout();
            service.currentToken = null;
        }

        function getUser(id) {
            return dtApi.user.getById({id: id}).$promise;
        }

        function onLoaded() {
            $localStorage.user = service.current;
            authorize();
            $rootScope.$emit('user-logged-in');

            var defaultState = service.defaultState;

            if (defaultState === 'profile') {
                return $state.go(defaultState, {id: service.current.id});
            }

            $state.go(service.defaultState || 'home');
        }

        function onLoggedOut() {
            $localStorage.$reset({user: null});
            $localStorage.$reset({token: null});
            authorize();
            loadPermissions();
            setDefaultState();
            $uibModalStack.dismissAll();
            $state.go('login');
        }

        function loadPermissions() {
            service.permissions = permissions.get(service.current.role);
        }

        function setDefaultState() {
            service.defaultState = permissions.getDefaultState(service.current.role);
        }

        function isPermissionAvailable(permissionName) {
            return service.permissions.isPermissionAvailable(permissionName);
        }

        function update(id, userData) {
            return dtApi.user.update({id: id}, userData).$promise
                .then(function() {
                    service.current.reload();
                });
        }
    }
})();


