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
            this.isLoadInProcess = false;
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
                this.workingDays.length = 0;
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

        Schedule.prototype.getData = function() {
            return {
                id: this.id,
                name: this.name,
                institutionId: this.institutionId,
                workingDays: this.workingDays,
                isDefaultSchedule: this.name ? false : true
            }
        };

        Schedule.prototype.add = function() {
            var _this = this;
            return workingDays.add(this.getData())
                .then(function(response) {
                    _this.id = response.data.id;
                    _this.emit('schedule-created');
                })
        };

        Schedule.prototype.update = function() {
            var _this = this;
            return workingDays.update(this.getData())
                .then(function() {
                    _this.getRemote();
                    _this.emit('schedule-updated');
                });
        };

        Schedule.prototype.getRemote = function() {
            var _this = this;
            this.isLoadInProcess = true;

            return workingDays.getById(this.id)
                .then(function(response) {
                    _this.init(response.data);
                })
                .finally(function() {
                    _this.isLoadInProcess = false;
                })
        };


        return Schedule;
    }
})();