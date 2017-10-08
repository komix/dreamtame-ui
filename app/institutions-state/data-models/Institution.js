(function() {
    'use strict';

    angular
        .module('app')
        .factory('Institution', institution);

    institution.$inject = ['instService'];
    /* @ngInject */
    function institution(instService) {
        _(Institution.prototype).extend(EventEmitter.prototype);

        function Institution(params) {
            this.id = null;
            this.title = '';
            this.categoryId = null;
            this.description = '';
            this.photoId = null;
            this.lat = '';
            this.lng = null;
            this.address = '';
            this.owner = null;

            this.init(params);
        }

        Institution.prototype.init = function(params) {
            if (params.id) { this.id = params.id; }
            if (params.title) { this.title = params.title; }
            if (params.categoryId) { this.categoryId = params.categoryId; }
            if (params.description) { this.description = params.description; }
            if (params.photoId) { this.photoId = params.photoId; }
            if (params.lat) { this.lat = params.lat; }
            if (params.lng) { this.lng = params.lng; }
            if (params.address) { this.address = params.address; }
            if (params.owner) { this.owner = params.owner; }
        };

        Institution.prototype.getData = function() {

        };

        Institution.prototype.create = function() {

        };

        return Institution;
    }
})();