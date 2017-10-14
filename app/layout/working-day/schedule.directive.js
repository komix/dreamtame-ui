(function () {
    'use strict';

    angular
        .module('app')
        .directive('schedule', schedule);

    schedule.$inject = [];
    /* @ngInject */
    function schedule() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: ScheduleController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'layout/working-day/schedule.html',
            scope: {
                workingDays: '='
            }
        };

        return directive;
    }

    ScheduleController.$inject = ['workingDays', 'modalService', 'users'];

    function ScheduleController(workingDays, modalService, users) {
        var vm = this;

        vm.daysOfWeek = workingDays.daysOfWeek;
        vm.workingDaysService = workingDays;

        vm.openWorkingHoursModal = openWorkingHoursModal;
        vm.isOwner = isOwner;

        function openWorkingHoursModal(scheduleItem) {
            if (vm.workingDays.hasDefaultSchedule() && !scheduleItem) {
                scheduleItem = vm.workingDays.getDefaultSchedule();
            }

            modalService.showWorkingHoursModal(scheduleItem, {
                schedules: vm.workingDays
            });
        }

        function isOwner() {
            if (!users.current) { return false }

            return vm.workingDays.getOwnerId() === users.current.id;
        }

    }

})();