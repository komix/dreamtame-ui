(function() {
    'use strict';

    angular
        .module('app')
        .factory('instService', instService);

    instService.$inject = ['$q', '$http', 'global'];
    /* @ngInject */
    function instService($q, $http, global) {

        var apiUrl = global.apiUrl;

        var service = {
            add: add,
            get: get,
            update: update,
            remove: remove,
        };

        return service;

        function add(inst) {
            var defered = $q.defer();

            $http.post(apiUrl +  '/api/institutions', inst).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function get(instId){
            var defered = $q.defer();
            $http.get(apiUrl +  '/institutions/' + instId).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function update(inst) {
            var defered = $q.defer();
            $http.put(apiUrl +  '/api/institutions/' + inst.id, inst).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function remove(instId) {
            var defered = $q.defer();
            $http.delete(apiUrl +  '/api/institutions/' + instId).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }
    }
})();