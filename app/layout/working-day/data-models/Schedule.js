(function() {
    'use strict';

    angular
        .module('app')
        .factory('Schedule', schedule);

    schedule.$inject = ['workingDays'];
    /* @ngInject */
    function schedule(workingDays) {
        _(Schedule.prototype).extend(EventEmitter.prototype);

        var daysOfWeek = workingDays.daysOfWeek;

        function Schedule(options) {
            this.id = null;
            this.name = '';
            this.institutionId = null;
            this.institution = null;
            this.isDefaultSchedule = false;
            this.workingDays = [];

            this.init(options)
        }

        Schedule.prototype.init = function(options) {
            if (options.id) { this.id = options.id; }
            if (options.name) { this.name = options.name; }
            if (options.institutionId) { this.institutionId = options.institutionId; }
            if (options.institution) { this.institution = options.institution; }
            if (options.isDefaultSchedule) { this.isDefaultSchedule = options.isDefaultSchedule; }

            if (options.workingDays) {
                this.addWorkingDaysList(options.workingDays);
            }
        };

        Schedule.prototype.addWorkingDay = function(day) {
            this.workingDays.push(day);
        };

        Schedule.prototype.removeDay = function(day) {
            var index = _.indexOf(this.workingDays, day);

            if (index === -1) { return false }

            this.workingDays.splice(index, 1);
        };

        Schedule.prototype.addWorkingDaysList = function(daysList) {
            var _this = this;
            _.each(daysList, function(elem) {
                _this.addWorkingDay(elem);
            });
        };


        return Schedule;
    }
})();