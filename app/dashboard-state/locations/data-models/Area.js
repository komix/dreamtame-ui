(function() {
    'use strict';

    angular
        .module('app')
        .factory('Area', area);

    area.$inject = ['locations'];
    /* @ngInject */
    function area(locations) {
        _(Area.prototype).extend(EventEmitter.prototype);

        function Area(params) {
            this.id = null;
            this.name = '';
            this.fromLat = null;
            this.fromLng = null;
            this.toLat = null;
            this.toLng = null;
            this.locationId = null;

            this.init(params);
        }

        Area.prototype.init = function(params) {
            if (!params) { return false; }

            if (params.id) { this.id = params.id; }
            if (params.name) { this.name = params.name; }
            if (params.fromLat) { this.fromLat = params.fromLat; }
            if (params.fromLng) { this.fromLng = params.fromLng; }
            if (params.toLat) { this.toLat = params.toLat; }
            if (params.toLng) { this.toLng = params.toLng; }
            if (params.locationId) { this.locationId = params.locationId; }
        };

        Area.prototype.getData = function() {
            var data = {
                name: this.name,
                fromLat: this.fromLat,
                fromLng: this.fromLng,
                toLat: this.toLat,
                toLng: this.toLng,
                locationId: this.locationId
            };

            if (this.id) {
                data.id = this.id;
            }

            return data;
        };

        Area.prototype.create = function() {
            return locations.addArea(this.getData());
        };

        Area.prototype.update = function(area) {
            console.log(area);
            this.init(area);
            return locations.updateArea(this.getData());
        };

        Area.prototype.getRemote = function() {
            var _this = this;
            return areas.get(this.id).then(function(response) {
                _this.init(response.data);
            });
        };

        return Area;
    }
})();