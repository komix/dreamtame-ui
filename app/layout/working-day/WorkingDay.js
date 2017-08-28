(function() {
    'use strict';

    angular
        .module('app')
        .factory('WorkingDay', workingDay);

    workingDay.$inject = ['workingDays'];
    /* @ngInject */
    function workingDay(workingDays) {
        _(WorkingDay.prototype).extend(EventEmitter.prototype);

        var daysOfWeek = workingDays.daysOfWeek;

        function WorkingDay(options) {
            this.start = new Date();
            this.end = new Date();
            this.dayNumber = null;
            this.dayName = null;
            this.workingHoursId = null;
            this.institutionId = null;


            this.isStartValid = true;
            this.isEndValid = true;
            this.isDayNumberValid = true;
            this.isValid = true;

            this.init(options)
        }

        WorkingDay.prototype.init = function(options) {
            if (options) {
                this.start = options.start || null;
                this.end = options.end || null;
                this.dayNumber = options.dayNumber;
                this.workingHoursId = options.workingHoursId || null;
                this.institutionId = options.institutionId || null;
            }
        };

        WorkingDay.prototype.checkValidity = function() {
            if (!this.start) {
                this.isStartValid = false;
            }

            if (!this.end) {
                this.isEndValid = false;
            }

            if (!this.dayNumber && this.dayNumber !== 0) {
                this.isDayNumberValid = false;
            }

            this.isValid = this.isStartValid && this.isEndValid && this.isDayNumberValid;


            return this.isValid;
        };

        WorkingDay.prototype.clearErrors = function() {
            this.isStartValid = true;
            this.isEndValid = true;
            this.isDayNumberValid = true;
        };

        WorkingDay.prototype.setDayName = function() {
            if (!this.dayNumber && this.dayNumber !== 0) { return false; }
            var _this = this;

            var day = _.find(daysOfWeek, function(elem) {
               return elem.dayNumber === _this.dayNumber;
            });

            this.dayName = day.dayName;
        };


        WorkingDay.prototype.getStartTimeFormatted = function() {
            return moment(this.start).format("hh:mm a");

        };


        WorkingDay.prototype.getEndTimeFormatted = function() {
            return moment(this.start).format("hh:mm a");
        };


        return WorkingDay;
    }
})();