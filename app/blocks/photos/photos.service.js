(function() {
    'use strict';

    angular
        .module('app')
        .factory('photosService', photos);

    photos.$inject = ['$q', '$http', 'global'];
    /* @ngInject */
    function photos($q, $http, global) {

        var apiUrl = global.apiUrl;

        var service = {
            getAll: getAll,
            get: get,
            add: add,
            edit: edit,
            remove: remove
        };

        return service;

        function getAll(){
            var defered = $q.defer();
            $http.get(apiUrl +  '/photos').then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function get(photoId) {
            var defered = $q.defer();
            $http.get(apiUrl +  '/photos/' + photoId).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function add(photo) {
            var defered = $q.defer();
            $http.post(apiUrl +  '/api/photos', photo).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function edit(category) {
            var defered = $q.defer();
            $http.put(apiUrl +  '/api/photos/' + category.id, category).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function remove(categoryId) {
            var defered = $q.defer();
            $http.delete(apiUrl +  '/api/photos/' + categoryId).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

    }
})();