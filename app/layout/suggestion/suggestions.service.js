(function() {
    'use strict';

    angular
        .module('app')
        .factory('suggestions', suggestions);

    suggestions.$inject = ['$q', '$http', 'global'];
    /* @ngInject */
    function suggestions($q, $http, global) {

        var apiUrl = global.apiUrl;

        var service = {
            add: add,
            get: get,
            getAll: getAll,
            update: update,
            remove: remove
        };

        return service;

        function add(article) {
            var defered = $q.defer();

            $http.post(apiUrl +  '/api/suggestions', article).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function get(id){
            var defered = $q.defer();
            $http.get(apiUrl +  '/suggestions/' + id).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function getAll() {
            var defered = $q.defer();
            $http.get(apiUrl +  '/suggestions').then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function update(article) {
            var defered = $q.defer();
            $http.put(apiUrl +  '/api/suggestions/' + article.id, article).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function remove(id) {
            var defered = $q.defer();
            $http.delete(apiUrl +  '/api/suggestions/' + id).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

    }
})();