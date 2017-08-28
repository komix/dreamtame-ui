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
                workingDays: '=',
                config: '=?'
            }
        };

        return directive;
    }

    ScheduleController.$inject = ['workingDays', 'modalService'];

    function ScheduleController(workingDays, modalService) {
        var vm = this;

        vm.daysOfWeek = workingDays.daysOfWeek;
        vm.workingDaysService = workingDays;

        vm.openWorkingHoursModal = openWorkingHoursModal;

        function openWorkingHoursModal(scheduleItem) {
            if (!scheduleItem) {
                scheduleItem = {
                    institutionId: vm.workingDays.institutionId
                }
            }
            modalService.showWorkingHoursModal(scheduleItem);
        }

    }

})();