(function() {
    'use strict';

    angular
        .module('app')
        .factory('Schedules', schedules);

    schedules.$inject = ['workingDays', 'Schedule'];
    /* @ngInject */
    function schedules(workingDays, Schedule) {
        _(Schedules.prototype).extend(EventEmitter.prototype);

        var defaultScheduleName = 'Розклад роботи';

        function Schedules(options) {
            this.id = null;
            this.name = null;
            this.data = [];
            this.institutionId = null;
            this.ownerId = null;

            this.isValid = true;

            this.init(options);
        }

        Schedules.prototype.init = function(options) {
            if (options) {
                this.id = options.id || null;
                this.institutionId = options.institutionId || null;
                this.ownerId = options.ownerId || null;
                this.name = options.name || null;
                this.data = options.data || [];
            }
        };

        Schedules.prototype.getRemote = function() {
            if (!this.institutionId) { return false; }
            var _this = this;
            return workingDays.get(this.institutionId).then(function(response) {
                if (response && response.data) {
                    _.each(response.data, function(elem) {
                        elem.institutionId = _this.institutionId;
                        var schedule = new Schedule(elem);
                        _this.addSchedule(schedule);
                    })
                }
            });
        };

        Schedules.prototype.checkValidity = function() {
            return this.isValid = !!this.data.length;
        };

        Schedules.prototype.addSchedule = function(schedule) {
            this.data.push(schedule);
        };

        Schedules.prototype.removeScheduleFromList = function(schedule) {
            var index = _.indexOf(this.data, schedule);
            this.data.splice(index, 1);
        };

        Schedules.prototype.hasDefaultSchedule = function() {
            return !!this.getDefaultSchedule();
        };

        Schedules.prototype.getDefaultSchedule = function() {
            return _.find(this.data, function(schedule) {
                return schedule.isDefaultSchedule;
            })
        };

        Schedules.prototype.isEmpty = function() {
            return !this.data.length;
        };

        Schedules.prototype.getInstitution = function() {
            var scheduleWithInst = _.find(this.data, function(elem) {
               return elem.institution;
            });

            return scheduleWithInst ? scheduleWithInst.institution : null;
        };

        Schedules.prototype.getOwnerId = function() {
            if (this.ownerId) { return this.ownerId; }

            var institution = this.getInstitution();
            return institution ? institution.owner : null;
        };

        Schedules.prototype.removeSchedule = function(schedule) {
            var _this = this;

            return workingDays.remove(schedule.id)
                .then(function() {
                    _this.removeScheduleFromList(schedule);
                    _this.emit('schedule-deleted');
                })
        };

        return Schedules;
    }
})();

