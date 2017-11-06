(function () {
    'use strict';
    angular
        .module('app')
        .controller('DashboardLocationsController', DashboardLocationsController);

    DashboardLocationsController.$inject = ['$rootScope', 'LocationsList'];

    function DashboardLocationsController($rootScope, LocationsList) {
        var vm = this;

        vm.locations = new LocationsList();

        activate();

        function activate() {
            vm.locations.getRemote();
        }

    }
})();


