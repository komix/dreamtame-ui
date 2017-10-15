(function() {
    'use strict';

    angular
        .module('app')
        .factory('permissions', permissions);

    permissions.$inject = ['PermissionsGroup'];
    /* @ngInject */
    function permissions(PermissionsGroup) {
        var defaultStates = {
            guest: 'home',
            user: 'profile',
            admin: 'dashboard',
            superman: 'dashboard'
        };

        var guestPermissions = [
            'login',
            'recoverPassword',
            'changePassword',
            'confirm-email'
        ];

        var userPermissions = [
            'isAuthorized',
            'isOwner'
        ];

        var supermanPermissions = [
            'editInstitutions',
            'seeDashboard'
        ];

        //var superAdminPermissions = [];

        var permissions = {
            guest: guestPermissions,
            user: userPermissions,
            superman: _.union(userPermissions, supermanPermissions)
            //superman: _.union(userPermissions, adminPermissions, supermanPermissions)
        };

        var service = {
            get: get,
            getDefaultState: getDefaultState
        };

        return service;

        function get(role) {
            return new PermissionsGroup({name: role, list: permissions[role]});
        }

        function getDefaultState(role) {
            return  defaultStates[role];
        }
    }
})();