(function() {
    'use strict';

    angular
        .module('app')
        .factory('WorkingDays', workingDays);

    workingDays.$inject = ['workingDays'];
    /* @ngInject */
    function workingDays(workingDays) {
        _(WorkingDays.prototype).extend(EventEmitter.prototype);

        function WorkingDays(options) {
            this.id = null;
            this.name = null;
            this.data = [];
            this.institutionId = null;

            this.isValid = true;

            this.init(options);
        }

        WorkingDays.prototype.init = function(options) {
            if (options) {
                this.id = options.id || null;
                this.institutionId = options.institutionId || null;
                this.name = options.name || null;
                this.data = options.data || [];
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
                name: this.name,
                institutionId: this.institutionId,
                workingDays: this.data
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


        return WorkingDays;
    }
})();

