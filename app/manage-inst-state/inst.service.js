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
            getAll: getAll,
            getByOwnerId: getByOwnerId,
            getByCategoryId: getByCategoryId,
            update: update,
            remove: remove,
            setRecruitAge: setRecruitAge,
            addPhoneNumber: addPhoneNumber,
            editPhoneNumber: editPhoneNumber,
            removePhoneNumber: removePhoneNumber
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

        function getAll() {
            var defered = $q.defer();
            $http.get(apiUrl +  '/institutions').then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function getByOwnerId(id) {
            var defered = $q.defer();
            $http.get(apiUrl + '/institutions/owner/' + id).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function getByCategoryId(id) {
            var defered = $q.defer();
            $http.get(apiUrl +  '/institutions/category/' + id).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function update(instId, inst) {
            var defered = $q.defer();
            $http.put(apiUrl +  '/api/institutions/' + instId, inst).then(function(data){
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

        function setRecruitAge(instId, ageRange) {
            var defered = $q.defer();

            $http.post(apiUrl + '/api/institutions/' + instId + '/recruit-age', ageRange).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function addPhoneNumber(options) {
            var defered = $q.defer();

            $http.post(apiUrl + '/api/phone-numbers', options).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function editPhoneNumber(id, options) {
            var defered = $q.defer();

            $http.put(apiUrl + '/api/phone-numbers/' + id, options).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function removePhoneNumber(id) {
            var defered = $q.defer();
            $http.delete(apiUrl +  '/api/phone-numbers/' + id).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }
    }
})();