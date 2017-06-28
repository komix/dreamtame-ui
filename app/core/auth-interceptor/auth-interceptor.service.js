(function () {
    'use strict';

    angular.module('app')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$q', '$state', '$rootScope', '$localStorage'];

    function authInterceptor($q, $state, $rootScope, $localStorage) {
        var authInterceptorService = {};
        authInterceptorService.request = request;
        authInterceptorService.responseError = responseError;

        return authInterceptorService;

        function request(config) {
            config.headers = config.headers || {};
            var token = $localStorage.token;

            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        }

        function responseError(rejection) {
            if (rejection.status === 401) {
                $rootScope.$emit('token-invalid');
                return $q(function(){return null;});
            }

            return $q.reject(rejection);
        }
    }
})();