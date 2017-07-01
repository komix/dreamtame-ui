(function(){
    'use strict';

    angular
        .module('app')
        .factory('dtApi', dtApi);

    dtApi.$inject = ['$resource', 'global'];

    /* @ngInject */
    function dtApi($resource, global) {
        var apiUrl = global.apiUrl,
            resource = $resource('', {}, {
                getUserById: {method: 'GET', url: apiUrl + '/users/:id', isArray: false},
                getUserByToken: {method: 'GET', url: apiUrl + '/api/users/get/by-token', isArray: false},
                updateUser: {method: 'PUT', url: apiUrl + '/api/users/:id', isArray: false}
            }),
            service = {
                user: {
                    getById: resource.getUserById,
                    getByToken: resource.getUserByToken,
                    update: resource.updateUser
                }

            };

        return service;
    }
})();