(function() {
    'use strict';

    angular
        .module('app')
        .factory('videos', videos);

    videos.$inject = ['$q', '$http', 'global'];
    /* @ngInject */
    function videos($q, $http, global) {

        var apiUrl = global.apiUrl;

        var service = {
            getAll: getAll,
            get: get,
            getByInstId: getByInstId,
            add: add,
            edit: edit,
            remove: remove
        };

        return service;

        function getAll(){
            var defered = $q.defer();
            $http.get(apiUrl +  '/videos').then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function get(photoId) {
            var defered = $q.defer();
            $http.get(apiUrl +  '/videos/' + photoId).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function getByInstId(id) {
            var defered = $q.defer();
            $http.get(apiUrl +  '/videos/institution/' + id).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function add(photo) {
            var defered = $q.defer();
            $http.post(apiUrl +  '/api/videos', photo).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function edit(category) {
            var defered = $q.defer();
            $http.put(apiUrl +  '/api/videos/' + category.id, category).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function remove(categoryId) {
            var defered = $q.defer();
            $http.delete(apiUrl +  '/api/videos/' + categoryId).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

    }
})();