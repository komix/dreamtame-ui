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

    ManageScheduleController.$inject = ['WorkingDay', 'workingDays', 'WorkingDays'];

    function ManageScheduleController(WorkingDay, workingDaysService, WorkingDays) {
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

            }

            vm.workingDay = new WorkingDay();
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
            vm.workingDays.addDay(vm.workingDay);

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
            return true;
            //if (!vm.workingDays.data.length) { return true }
            //return !_.find(vm.workingDays.data, function(elem) {
            //    return elem.dayNumber === actual.dayNumber;
            //})
        }

        function removeWorkingDay(day) {
            vm.scheduleItem.removeDay(day);
        }

        function removeSchedule() {
            vm.workingDays.remove();
        }

        function setPristine() {
            vm.infoform.$setPristine();
        }

        function isDefaultScheduleWarningVisible() {
            return vm.config.schedules.hasDefaultSchedule && !vm.isEditState;
        }

        function isGroupScheduleWarningVisible() {
            return !vm.config.hasDefaultSchedule && vm.config.data && vm.config.data.length;
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

            var request = vm.workingDays.id ? vm.workingDays.update() : vm.workingDays.add();

            request.then(function(response) {
                console.log(response);
            });
        }

    }

})();