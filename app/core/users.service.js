(function() {
    'use strict';

    angular
        .module('app')
        .factory('users', users);

    users.$inject = ['$q', '$http', '$state', 'global', 'User', '$uibModalStack', '$localStorage'];

    function users($q, $http, $state, global, User, $uibModalStack, $localStorage) {

        var user = $localStorage.user || {};

        user.eventHandlers = {
            onLoaded: onLoaded
        };

        var service = {
            current: new User(user),
            login: login,
            logout: logout
        };

        return service;

        function login(credentials) {
            service.current.login(credentials);
        }

        function logout() {
            service.current.logout();
            //service.currentToken = null;
            //localStorage.removeItem('token');
            //$uibModalStack.dismissAll();
            //$state.go('login');
        }

        function onLoaded() {
            $localStorage.user = service.current;
        }
    }
})();


