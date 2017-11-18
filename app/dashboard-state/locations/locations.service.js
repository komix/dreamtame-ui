(function() {
    'use strict';

    angular
        .module('app')
        .factory('locations', locations);

    locations.$inject = ['$q', '$http', 'global'];
    /* @ngInject */
    function locations($q, $http, global) {

        var apiUrl = global.apiUrl;

        var service = {
            add: add,
            getById: getById,
            getAll: getAll,
            update: update,
            remove: remove,
            addArea: addArea,
            updateArea: updateArea,
            removeArea: removeArea
        };

        return service;

        function add(location) {
            var defered = $q.defer();

            $http.post(apiUrl +  '/api/locations', location).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function getById(id){
            var defered = $q.defer();
            $http.get(apiUrl +  '/locations/' + id).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function getAll() {
            var defered = $q.defer();

            $http.get(apiUrl +  '/locations').then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function update(location) {
            var defered = $q.defer();
            $http.put(apiUrl +  '/api/locations/' + location.id, location).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function remove(id) {
            var defered = $q.defer();
            $http.delete(apiUrl +  '/api/locations/' + id).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function addArea(area) {
            var defered = $q.defer();

            $http.post(apiUrl +  '/api/areas', area).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function updateArea(area) {
            var defered = $q.defer();
            $http.put(apiUrl +  '/api/areas/' + area.id, area).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function removeArea(id) {
            var defered = $q.defer();
            $http.delete(apiUrl +  '/api/areas/' + id).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

    }
})();