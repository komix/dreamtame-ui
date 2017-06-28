(function () {
    'use strict';

    angular
        .module('app')
        .config(authInterceptorConfigure);

    authInterceptorConfigure.$inject = ['$httpProvider'];

    function authInterceptorConfigure($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }
})();