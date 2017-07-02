(function() {
    'use strict';

    angular
        .module('app')
        .factory('categoriesService', categoriesService);

    categoriesService.$inject = ['$q', '$http', 'global'];
    /* @ngInject */
    function categoriesService($q, $http, global) {

        var apiUrl = global.apiUrl;

        var service = {
            getTree: getTree,
            add: add,
            get: get,
            update: update,
            remove: remove,
            getCatsList: getCatsList
        };

        return service;

        function add(category) {
            var defered = $q.defer();
            $http.post(apiUrl +  '/api/categories', category).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function get(catId){
            var defered = $q.defer();
            $http.get(apiUrl +  '/categories/' + catId).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function update(category) {
            var defered = $q.defer();
            $http.put(apiUrl +  '/api/categories/' + category.id, category).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function remove(categoryId) {
            var defered = $q.defer();
            $http.delete(apiUrl +  '/api/categories/' + categoryId).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }


        function getTree() {
            var defered = $q.defer();
            $http.get(apiUrl + '/categories/get-tree').then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function getCatsList() {
            var defered = $q.defer();
            $http.get(apiUrl + '/api/cats').then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }
    }
})();