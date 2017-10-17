(function() {
    'use strict';

    angular
        .module('app')
        .directive('dateTimePicker', dateTimePicker);

    dateTimePicker.$inject = [];
    /* @ngInject */
    function dateTimePicker() {
        var directive = {
            bindToController: true,
            controller: DateTimePickerController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'layout/datetimepicker/datetimepicker.html',
            scope: {
                dateTime: '='
            }
        };

        return directive;
    }

    DateTimePickerController.$inject = [];
    /* @ngInject */
    function DateTimePickerController() {
        var vm = this;

        var datepicker = {
            opened: false
        };
        var datepickerOptions = {
            showWeeks: false,
            startingDay: 1,
            formatDay: 'd',
            appendToBody: true
        };

        vm.datepicker = datepicker;
        vm.datepickerOptions = datepickerOptions;
        vm.toggleDatePicker = toggleDatePicker;
        vm.onNowCheckboxChange = onNowCheckboxChange;
        vm.onTimePickChange = onTimePickChange;
        vm.onDatePickChange = onDatePickChange;

        function toggleDatePicker() {
            vm.datepickerOptions.datepickerMode = 'day';
            vm.datepicker.opened = !vm.datepicker.opened;
        }

        vm.changed = function() {

        };

        ///////////////

        activate();

        ///////////////

        function activate() {

        }

        function onNowCheckboxChange() {
            vm.dateTime.setDisabledState(vm.setToNow);
        }

        function onTimePickChange() {
            vm.dateTime.onTimeChange();
        }

        function onDatePickChange() {
            vm.dateTime.onDateChange();
        }

    }
})();