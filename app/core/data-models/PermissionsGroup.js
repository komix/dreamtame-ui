(function() {
    'use strict';

    angular
        .module('app')
        .factory('PermissionsGroup', permissionsGroup);

    permissionsGroup.$inject = [];
    /* @ngInject */
    function permissionsGroup() {

        /**
         * @param {Object} params
         * @param {String} params.name - role name
         * @param {Array} params.permissions - list of available actions
         *
         * @constructor
         */
        function PermissionsGroup(params) {
            PermissionsGroup.validate(params);

            this.name = params.name;
            this.list = params.list;
        }

        PermissionsGroup.prototype.isPermissionAvailable = function(permission) {
            return _.isArray(permission)
                ? !!_.intersection(permission, this.list).length
                : _.contains(this.list, permission);
        };

        PermissionsGroup.validate = function(params) {
            if (!_(params).isObject()) {
                throw new Error('Incorrect argument "params", expected Object instead of passed ' + params);
            }

            if (!(_(params.name).isString() && params.name.length > 0)) {
                throw new Error('Incorrect argument "params.name", expected non empty string instead of passed ' + params.name);
            }

            if (_(params).has('permissions') && !(_(params.list).isArray() && params.name.length > 0)) {
                throw new Error('Incorrect argument "params.permissions", expected Array instead of passed ' + params.list);
            }
        };

        return PermissionsGroup;
    }
})();