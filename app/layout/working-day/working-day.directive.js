(function () {
    'use strict';

    angular
        .module('app')
        .directive('workingDay', workingDay);

    workingDay.$inject = [];
    /* @ngInject */
    function workingDay() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: WorkingDayController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'layout/working-day/working-day.html',
            scope: {
                config: '=?'
            }
        };

        return directive;
    }

    WorkingDayController.$inject = ['WorkingDay', 'workingDays', 'WorkingDays'];

    function WorkingDayController(WorkingDay, workingDaysService, WorkingDays) {
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
        vm.submit = submit;

        activate();

        function activate() {
            var options = {
                institutionId: vm.config.institutionId
            };

            if (vm.config.id) {
                options.id = vm.config.id;
                options.name = vm.config.name;
            }

            vm.workingDays = new WorkingDays(options);

            if (vm.config.id) {
                _.each(vm.config.workingDays, function(elem) {
                    var workingDay = new WorkingDay(elem);
                    vm.workingDays.addDay(workingDay);
                });
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
            if (!vm.workingDays.data.length) { return true }
            return !_.find(vm.workingDays.data, function(elem) {
                return elem.dayNumber === actual.dayNumber;
            })
        }

        function removeWorkingDay(day) {
            vm.workingDays.removeDay(day);
        }

        function removeSchedule() {
            vm.workingDays.remove();
        }

        function submit() {
            var request = vm.workingDays.id ? vm.workingDays.update() : vm.workingDays.add();

            request.then(function(response) {
                console.log(response);
            });
        }

    }

})();