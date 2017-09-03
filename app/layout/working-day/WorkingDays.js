(function() {
    'use strict';

    angular
        .module('app')
        .factory('WorkingDays', workingDays);

    workingDays.$inject = ['workingDays'];
    /* @ngInject */
    function workingDays(workingDays) {
        _(WorkingDays.prototype).extend(EventEmitter.prototype);

        var defaultScheduleName = 'Розклад роботи';

        function WorkingDays(options) {
            this.id = null;
            this.name = null;
            this.data = [];
            this.institutionId = null;
            this.isDefaultSchedule = false;

            this.isValid = true;

            this.init(options);
        }

        WorkingDays.prototype.init = function(options) {
            if (options) {
                this.id = options.id || null;
                this.institutionId = options.institutionId || null;
                this.name = options.name || null;
                this.data = options.data || [];
                this.isDefaultSchedule = options.isDefaultSchedule || false;
            }
        };

        WorkingDays.prototype.getRemote = function() {
            if (!this.institutionId) { return false; }
            var _this = this;
            return workingDays.get(this.institutionId).then(function(response) {
                if (response && response.data) {
                    _.each(response.data, function(elem) {
                        _this.data.push(elem);
                    })
                }
            });
        };

        WorkingDays.prototype.checkValidity = function() {
            return this.isValid = !!this.data.length;
        };

        WorkingDays.prototype.addDay = function(workingDay) {
            this.data.push(workingDay);
        };

        WorkingDays.prototype.removeDay = function(day) {
            var index = _.indexOf(this.data, day);
            this.data.splice(index, 1);
        };

        WorkingDays.prototype.getData = function() {
            return {
                id: this.id,
                name: this.isDefaultSchedule ? defaultScheduleName : this.name,
                institutionId: this.institutionId,
                workingDays: this.data,
                isDefaultSchedule: this.isDefaultSchedule || false
            }
        };

        WorkingDays.prototype.add = function() {
            return workingDays.add(this.getData());
        };

        WorkingDays.prototype.update = function() {
            return workingDays.update(this.getData());
        };

        WorkingDays.prototype.remove = function() {
            return workingDays.remove(this.id);
        };

        WorkingDays.prototype.hasDefaultSchedule = function() {
            return !!_.find(this.data, function(day) {
                return day.isDefaultSchedule;
            })
        };

        WorkingDays.prototype.getInstitution = function() {
            var scheduleWithInst = _.find(this.data, function(elem) {
               return elem.institution;
            });

            return scheduleWithInst ? scheduleWithInst.institution : null;
        };

        WorkingDays.prototype.getOwnerId = function() {
            var institution = this.getInstitution();

            return institution ? institution.owner : null;
        };

        return WorkingDays;
    }
})();

