(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('dashboard.locations', {
                    url:'/locations',
                    templateUrl: 'dashboard-state/locations/locations.view.html',
                    controller: 'DashboardLocationsController',
                    controllerAs: 'vm',
                    permissions: {
                        only: 'seeDashboard'
                    }
                })
        }])
})();