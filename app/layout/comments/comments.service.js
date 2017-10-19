(function() {
    'use strict';

    angular
        .module('app')
        .factory('commentsService', commentsService);

    commentsService.$inject = ['$q', '$http', 'global'];
    /* @ngInject */
    function commentsService($q, $http, global) {
        var apiUrl = global.apiUrl;

        var service = {
            getCommentsByUserId: getCommentsByUserId,
            getCommentsByInstitutionId: getCommentsByInstitutionId,
            getCommentsByArticleId: getCommentsByArticleId,
            add: add,
            edit: edit,
            remove: remove
        };

        return service;

        function getCommentsByUserId(id) {
            var defered = $q.defer();

            $http.get(apiUrl + '/comments/user/' + id).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function getCommentsByInstitutionId(id, params) {
            var defered = $q.defer();

            $http.post(apiUrl + '/comments/institution/' + id, params)
                .catch(function(error) {
                    defered.reject(error);
                })
                .then(function(data){
                    if (!data) { return false; }
                    defered.resolve(data);
                });

            return defered.promise;
        }

        function getCommentsByArticleId(id, params) {
            var defered = $q.defer();

            $http.post(apiUrl + '/comments/articles/' + id, params).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function add(comment) {
            var defered = $q.defer();

            $http.post(apiUrl + '/api/comments', comment).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function edit(comment) {
            var defered = $q.defer();

            $http.put(apiUrl + '/api/comments/' + comment.id, comment).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }

        function remove(id) {
            var defered = $q.defer();

            $http.delete(apiUrl + '/api/comments/' + id).then(function(data){
                defered.resolve(data);
            });

            return defered.promise;
        }


    }

})();
