(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('dashboard.locations.manage-location', {
                    url:'/manage-location?id',
                    templateUrl: 'dashboard-state/locations/manage-location/manage-location.view.html',
                    controller: 'DashboardManageLocationController',
                    controllerAs: 'vm',
                    permissions: {
                        only: 'seeDashboard'
                    }
                })
        }])
})();