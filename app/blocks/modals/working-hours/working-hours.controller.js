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

        vm.close = close;

        activate();

        function activate() {
            if (vm.schedule) {
                vm.config.schedules.on('schedule-deleted', function() {
                    $uibModalStack.dismissAll();
                });
                vm.schedule.on('schedule-updated', function() {
                    $uibModalStack.dismissAll();
                });
            }
        }

        function close() {
            $uibModalStack.dismissAll();

            if (vm.schedule.id) {
                vm.schedule.getRemote();
            }
        }
    }

})();