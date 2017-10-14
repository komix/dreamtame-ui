(function () {
    'use strict';

    angular
        .module('app')
        .controller('WorkingHoursModalController', WorkingHoursModalController);

    WorkingHoursModalController.$inject = ['$rootScope', 'schedule', 'config', '$uibModalStack', '$stateParams'];

    function WorkingHoursModalController($rootScope, schedule, config, $uibModalStack, $stateParams) {
        var vm = this;

        vm.schedule = schedule;
        vm.config = config;

        activate();

        function activate() {

        }
    }

})();