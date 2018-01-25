(function () {
    'use strict';

    angular
        .module('app')
        .directive('manageSchedule', manageSchedule);

    manageSchedule.$inject = [];
    /* @ngInject */
    function manageSchedule() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: ManageScheduleController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'layout/working-day/manage-schedule.html',
            scope: {
                scheduleItem: '=',
                config: '=?'
            }
        };

        return directive;
    }

    ManageScheduleController.$inject = ['WorkingDay', 'workingDays', 'Schedule', '$uibModalStack'];

    function ManageScheduleController(WorkingDay, workingDaysService, Schedule, $uibModalStack) {
        var vm = this;

        vm.workingDaysService = workingDaysService;
        vm.daysOfWeek = workingDaysService.daysOfWeek;

        vm.submitWorkingDay = submitWorkingDay;
        vm.addWorkingDay = addWorkingDay;
        vm.onDaySelectChange = onDaySelectChange;
        vm.getTimeFormatted = getTimeFormatted;
        vm.optionsFilter = optionsFilter;
        vm.removeWorkingDay = removeWorkingDay;
        vm.removeSchedule = removeSchedule;
        vm.setPristine = setPristine;
        vm.isDefaultScheduleWarningVisible = isDefaultScheduleWarningVisible;
        vm.isGroupScheduleWarningVisible = isGroupScheduleWarningVisible;
        vm.areScheduleTypeOptionsVisible = areScheduleTypeOptionsVisible;
        vm.submit = submit;

        activate();

        function activate() {
            if (!vm.scheduleItem) {
                vm.scheduleItem = new Schedule({
                    institutionId: vm.config.schedules.institutionId
                });
            } else {
                vm.isEditState = true;
            }

            vm.workingDay = new WorkingDay();

            addEventHandlers();
        }

        function addEventHandlers() {
            vm.scheduleItem.on('schedule-created', function() {
                vm.config.schedules.addSchedule(vm.scheduleItem);
                $uibModalStack.dismissAll();
            });
        }


        function submitWorkingDay() {
            if (!vm.workingDay.checkValidity()) {
                return false;
            }

            addWorkingDay();
        }

        function addWorkingDay() {
            var oldDayStart = vm.workingDay.start;
            var oldDayEnd = vm.workingDay.end;
            vm.scheduleItem.addWorkingDay(vm.workingDay);

            vm.workingDay = new WorkingDay({
                start: oldDayStart,
                end: oldDayEnd
            });
        }

        function onDaySelectChange() {
            vm.workingDay.setDayName();
            vm.workingDay.clearErrors();
        }

        function getTimeFormatted(dateObj) {
            return moment(dateObj).format("HH:mm");
        }

        function optionsFilter(actual) {
            if (!vm.scheduleItem.workingDays.length) { return true }
            return !_.find(vm.scheduleItem.workingDays, function(elem) {
                return elem.dayNumber === actual.dayNumber;
            })
        }

        function removeWorkingDay(day) {
            vm.scheduleItem.removeDay(day);
        }

        function removeSchedule() {
            vm.config.schedules.removeSchedule(vm.scheduleItem);
        }

        function setPristine() {
            vm.infoform.$setPristine();
        }

        function isDefaultScheduleWarningVisible() {
            return vm.scheduleItem.isDefaultSchedule && vm.config.schedules.hasDefaultSchedule();
        }

        function isGroupScheduleWarningVisible() {
            return !vm.config.schedules.hasDefaultSchedule()
                && vm.config.schedules.data
                && vm.config.schedules.data.length;
        }

        function areScheduleTypeOptionsVisible() {
            return !vm.isEditState && !vm.config.schedules.data.length;
        }

        function submit() {
            if (!vm.infoform.$valid) {
                _.each(vm.infoform.$error.required, function(elem) {
                    elem.$setDirty();
                });
                return false;
            }

            var request = vm.scheduleItem.id ? vm.scheduleItem.update() : vm.scheduleItem.add();

            request.then(function(response) {
                console.log(response);
            });
        }

    }

})();