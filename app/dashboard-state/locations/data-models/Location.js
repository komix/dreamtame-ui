(function() {
    'use strict';

    angular
        .module('app')
        .factory('Location', location);

    location.$inject = ['locations', 'Area'];
    /* @ngInject */
    function location(locations, Area) {
        _(Location.prototype).extend(EventEmitter.prototype);

        function Location(params) {
            this.id = null;
            this.name = '';
            this.lat = null;
            this.lng = null;
            this.areas = [];

            this.init(params);
        }

        Location.prototype.init = function(params) {
            if (!params) { return false; }

            if (params.id) { this.id = params.id; }
            if (params.name) { this.name = params.name; }
            if (params.lat) { this.lat = params.lat; }
            if (params.lng) { this.lng = params.lng; }
            if (params.areas && params.areas.length) {
                this.addAreasList(params.areas);
            }
        };

        Location.prototype.getData = function() {
            var data = {
                name: this.name,
                lat: this.lat,
                lng: this.lng
            };

            if (this.id) {
                data.id = this.id;
            }

            return data;
        };

        Location.prototype.create = function() {
            return locations.add(this.getData());
        };

        Location.prototype.update = function() {
            return locations.update(this.getData());
        };

        Location.prototype.getRemote = function() {
            var _this = this;
            return locations.getById(this.id).then(function(response) {
                _this.init(response.data);
            });
        };

        Location.prototype.setCoords = function(coords) {
            this.lat = coords.lat;
            this.lng = coords.lng;
        };

        Location.prototype.areCoordsDefined = function() {
            return !!(this.lat && this.lng);
        };

        Location.prototype.addArea = function(area) {
            this.areas.push(area);
        };

        Location.prototype.addAreasList = function(areasList) {
            var _this = this;

            _.each(areasList, function(elem) {
                var newArea = new Area(elem);
                _this.addArea(newArea);
            });
        };

        Location.prototype.createArea = function(options) {
            var newArea = new Area(options);
            var _this = this;

            newArea.create().then(function() {
                _this.addArea(newArea);
            });
        };

        Location.prototype.updateArea = function(options) {
            var areaToUpdate = this.getAreaById(options.id);
            if (!areaToUpdate) { return false; }

            areaToUpdate.update(options);
        };

        Location.prototype.getAreaById = function(id) {
            return _.find(this.areas, function(elem) {
               return elem.id === id;
            });
        };


        return Location;
    }
})();