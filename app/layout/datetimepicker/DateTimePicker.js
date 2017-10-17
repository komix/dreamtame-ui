(function() {
    'use strict';

    angular
        .module('app')
        .factory('DateTimePicker', dateTimePicker);

    dateTimePicker.$inject = [];
    /* @ngInject */
    function dateTimePicker() {
        _(DateTimePicker.prototype).extend(EventEmitter.prototype);

        function DateTimePicker(options) {
            this.dateTime = null;
            this.date = options && options.date ? options.date : new Date();
            this.time = options && options.time ? options.time : new Date();
            this.isTimeValid = true;
            this.isDateValid = true;
            this.isDisabled = false;
            this.setToNowCheckbox = options && options.setToNowCheckbox ? options.setToNowCheckbox : false;

            this.init()
        }

        DateTimePicker.prototype.init = function() {
            this.updateDateTime();
        };

        DateTimePicker.prototype.updateDateTime = function() {
            this.dateTime = this.getDateTime();
        };

        DateTimePicker.prototype.getDateTime = function() {
            return this.isDateTimeValid()
                ? new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(),
                    this.time.getHours(), this.time.getMinutes(), this.time.getSeconds())
                : null;
        };

        DateTimePicker.prototype.isDateTimeValid = function() {
            var dateValid = this.isDateValueValid(this.date);
            var timeValid = this.isDateValueValid(this.time);

            return dateValid && timeValid;
        };

        DateTimePicker.prototype.checkValidity = function() {
            this.isDateValid = this.isDateValueValid(this.date);
            this.isTimeValid = this.isDateValueValid(this.time);
            var isTimeDateValid = this.isDateValueValid(this.dateTime);

            return this.isDateValid && this.isTimeValid && isTimeDateValid;
        };

        DateTimePicker.prototype.isDateValueValid = function(dateObj) {
            return _.isDate(dateObj);
        };

        DateTimePicker.prototype.setToNow = function() {
            this.date = new Date();
            this.time = new Date();
            this.updateDateTime();
        };

        DateTimePicker.prototype.setDisabledState = function(value) {
            if (value) {
                this.setToNow();
            }

            this.isDisabled = value;
        };

        DateTimePicker.prototype.onTimeChange = function() {
            this.isTimeValid = true;
            this.updateDateTime();
            this.emit('change');
        };

        DateTimePicker.prototype.onDateChange = function() {
            this.isDateValid = true;
            this.updateDateTime();
            this.emit('change');
        };

        DateTimePicker.prototype.getDateTimeISOString = function() {
            return moment(this.dateTime).toISOString();
        };

        DateTimePicker.prototype.getFormattedString = function() {
            if (!this.isDateTimeValid()) { throw new Error('Datetime is invalid'); }

            return moment(this.dateTime).format("YYYY-MM-DD hh:mm")
        };

        return DateTimePicker;
    }
})();