(function() {
    'use strict';

    angular
        .module('app')
        .factory('categoriesService', categoriesService);

    categoriesService.$inject = ['$q', '$http', 'global', 'helper'];
    /* @ngInject */
    function categoriesService($q, $http, global, helper) {

        var apiUrl = global.apiUrl;

        var service = {
            activeId: null,
            tree: null,
            getTree: getTree,
            add: add,
            get: get,
            update: update,
            remove: remove,
            getCatsList: getCatsList,
            getCategoryChildrenIds: getCategoryChildrenIds,
            getInstanceById: getInstanceById
        };

        init();

        return service;

        function init() {
            getTree();
        }

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
            $http.get(apiUrl + '/categories/get-tree').then(function(response){
                defered.resolve(response);
                service.tree = response.data;
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

        function getCategoryChildrenIds(id) {
            var childrenIds = [id];
            var hash = helper.getHash(service.tree, 'id');

            getChildrenIds(id);

            return childrenIds;

            function getChildrenIds(id) {
                _.each(hash, function(value) {
                    if (parseInt(value.parent) === parseInt(id)) {
                        childrenIds.push(value.id);
                        getChildrenIds(value.id);
                    }
                });
            }
        }

        function getInstanceById(id) {
            if (!service.tree) { return false; }
            var hash = helper.getHash(service.tree, 'id');

            return hash[id];
        }
    }
})();