(function() {
    'use strict';

    angular
        .module('app')
        .factory('users', users);

    users.$inject = ['$state', '$rootScope', '$timeout', 'dtApi', 'User', 'permissions', '$uibModalStack',
        '$localStorage', 'imageService'];

    function users($state, $rootScope, $timeout, dtApi, User, permissions, $uibModalStack,
                   $localStorage, imageService) {

        var service = {
            current: null,
            permissions: null,
            defaultState: null,
            authorize: authorize,
            login: login,
            signup: signup,
            activate: activate,
            logout: logout,
            getUser: getUser,
            update: update,
            isPermissionAvailable: isPermissionAvailable,
            requestPasswordChange: requestPasswordChange,
            restorePassword: restorePassword,
            watchFacebookAuthChange: watchFacebookAuthChange
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
            return service.current.login(credentials);
        }

        function signup(credentials) {
            return service.current.signup(credentials);
        }

        function activate(token) {
            return service.current.activate(token);
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
            $state.go('login.signin');
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

        function requestPasswordChange(email) {
            return service.current.requestPasswordChange({email: email});
        }

        function restorePassword(params) {
            return service.current.restorePassword(params)
        }

         function watchFacebookAuthChange() {
             FB.Event.subscribe('auth.authResponseChange', function(res) {
                if (res.status === 'connected') {
                    service.current.loginWithOuterService(res.authResponse.accessToken);
                }
            });
        }
    }
})();


