(function() {
    'use strict';

    angular
        .module('app')
        .factory('news', news);

    news.$inject = ['$q', '$http', 'global'];
    /* @ngInject */
    function news($q, $http, global) {

        var apiUrl = global.apiUrl;

        var service = {
            add: add,
            get: get,
            getLastN: getLastN,
            getAll: getAll,
            update: update,
            remove: remove,
        };

        return service;

        function add(article) {
            var defered = $q.defer();

            $http.post(apiUrl +  '/api/news', article).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function get(id){
            var defered = $q.defer();
            $http.get(apiUrl +  '/news/' + id).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function getAll(params) {
            var defered = $q.defer();
            $http.post(apiUrl +  '/news', params).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function getLastN(params) {
            var defered = $q.defer();
            $http.post(apiUrl +  '/news/last-n', params).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function update(article) {
            var defered = $q.defer();
            $http.put(apiUrl +  '/api/news/' + article.id, article).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function remove(id) {
            var defered = $q.defer();
            $http.delete(apiUrl +  '/api/news/' + id).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

    }
})();