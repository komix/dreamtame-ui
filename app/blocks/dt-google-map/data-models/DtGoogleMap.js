(function() {
    'use strict';

    angular
        .module('app')
        .factory('DtGoogleMap', dtGoogleMap);

    dtGoogleMap.$inject = ['DtGooglePlacesInput'];
    /* @ngInject */
    function dtGoogleMap(DtGooglePlacesInput) {
        _(DtGoogleMap.prototype).extend(EventEmitter.prototype);

        var DEFAULT_COORDS = {
            lat: 49.843727,
            lng: 24.026395
        };

        var ACTIVE_RECT_COLOR = '#58a55c';
        var DEFAULT_RECT_COLOR = '#262626';

        function DtGoogleMap(params) {
            this.mapEl = null;
            this.placesInputEl = null;
            this.map = null;
            this.placesInput = null;
            this.zoom = null;
            this.center = null;
            this.eventHandlers = {};
            this.editableAreas = false;
            this.placeMarker = false;
            this.activeRectangle = null;
            this.rectangles = [];
            this.drawedRectangles = [];

            this.init(params);
            this.attachEventHandlers();
        }

        DtGoogleMap.prototype.init = function(params) {
            if (!params || !params.mapEl) { throw new Error('Incorrect arguments for gmap'); }

            if (params.mapEl) { this.mapEl = params.mapEl; }
            if (params.placesInputEl) { this.placesInputEl = params.placesInputEl; }
            if (params.eventHandlers) { this.eventHandlers = params.eventHandlers; }
            if (params.editableAreas) { this.editableAreas = params.editableAreas; }
            if (params.placeMarker) { this.placeMarker = true; }
            if (params.rectangles) { this.rectangles = params.rectangles; }

            this.center = this.getLocation(params.center);

            this.zoom = params.zoom || 17;
            this.map = new google.maps.Map(this.mapEl, {zoom: this.zoom, center: this.center});

            if (this.placesInputEl) {
                this.placesInput = new DtGooglePlacesInput({inputEl: this.placesInputEl})
            }

            if (params.center) {
                this.centerMap(params.center);

                if (this.placeMarker) {
                    this.setMarker(params.center);
                }
            }

            this.drawRectangles();
        };

        DtGoogleMap.prototype.getLocation = function(coords) {
            if (!coords) { coords = DEFAULT_COORDS; }

            return new google.maps.LatLng(coords.lat, coords.lng);
        };

        DtGoogleMap.prototype.centerMap = function(coords) {
            this.map.setCenter(coords);
        };

        DtGoogleMap.prototype.onPlaceChange = function(params) {
            if (!params || !params.position) { return false; }

            this.centerMap(params.position);

            if (this.eventHandlers.onPlaceChange) {
                this.eventHandlers.onPlaceChange(params.position);
            }
        };

        DtGoogleMap.prototype.getDefaultBounds = function() {
            var point = this.getCenter();
            var radius = 1;
            var r_earth = 6378;
            var pi = Math.PI;

            return {
                fromLat: point.lat - (radius / r_earth) * (180 / pi),
                toLat: point.lat + (radius / r_earth) * (180 / pi),
                fromLng: point.lng - (radius / r_earth) * (180 / pi) / Math.cos(point.lat * pi/180),
                toLng: point.lng + (radius / r_earth) * (180 / pi) / Math.cos(point.lat * pi/180)
            };
        };

        DtGoogleMap.prototype.addRectangle = function() {
            if (this.activeRectangle) { return false; }

            this.activeRectangle = this.drawRectangle({
                points: this.getDefaultBounds(),
                active: true
            });
        };

        DtGoogleMap.prototype.attachEventHandlers = function() {
            if (this.placesInput) {
                this.placesInput.on('place-changed', this.onPlaceChange.bind(this));
            }
        };

        DtGoogleMap.prototype.getCenter = function() {
            var latLng = this.map.getCenter();

            return {
                lat: latLng.lat(),
                lng: latLng.lng()
            }
        };

        DtGoogleMap.prototype.setMarker = function(coords) {
            if (!coords) { return false; }

            if (!this.mainMarker) {
                this.mainMarker = new google.maps.Marker({
                    position: coords,
                    map: this.map
                });
            } else {
                this.mainMarker.setPosition(coords);
            }
        };

        DtGoogleMap.prototype.submitActiveRectangle = function() {
            if (!this.activeRectangle) { return false; }

            var bounds = this.activeRectangle.getBounds();
            var toBounds = bounds.getNorthEast();
            var fromBounds = bounds.getSouthWest();

            if (this.eventHandlers.onRectangleSubmitted) {
                this.eventHandlers.onRectangleSubmitted({
                    id: this.activeRectangle.id,
                    name: this.activeRectangle.text,
                    fromLat: fromBounds.lat(),
                    fromLng: fromBounds.lng(),
                    toLat: toBounds.lat(),
                    toLng: toBounds.lng()
                })
            }

            var options = {
                editable: false,
                draggable: false,
                fillColor: DEFAULT_RECT_COLOR,
                strokeColor: DEFAULT_RECT_COLOR
            };

            this.activeRectangle.setOptions(options);

            this.activeRectangle = null;
        };

        DtGoogleMap.prototype.drawRectangles = function() {
            var _this = this;

            _.each(this.rectangles, function(elem) {
                console.log(elem);
                _this.drawRectangle({
                    id: elem.id,
                    points: elem,
                    text: elem.name
                })
            });
        };

        DtGoogleMap.prototype.drawRectangle = function(options) {
            var bounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(options.points.fromLat, options.points.fromLng),
                new google.maps.LatLng(options.points.toLat, options.points.toLng));

            var rectangle = new google.maps.Rectangle({
                bounds: bounds,
                strokeColor: options.active ? ACTIVE_RECT_COLOR : DEFAULT_RECT_COLOR,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: options.active ? ACTIVE_RECT_COLOR : DEFAULT_RECT_COLOR,
                fillOpacity: 0.35,
                editable: options.active,  // Make it editable, set its editable property to true
                draggable: options.active,
                id: options.id || null,
                text: options.text
            });

            rectangle.setMap(this.map);

            this.drawedRectangles.push(rectangle);

            return rectangle;
        };

        DtGoogleMap.prototype.activateRectangle = function(id) {
            var rectangle = _.find(this.drawedRectangles, function(elem) {
                return elem.id === id;
            });

            if (!rectangle) { return false; }

            rectangle.editable = true;
            rectangle.draggable = true;
            rectangle.fillColor = ACTIVE_RECT_COLOR;
            rectangle.strokeColor = ACTIVE_RECT_COLOR;

            var options = {
                editable: true,
                draggable: true,
                fillColor: ACTIVE_RECT_COLOR,
                strokeColor: ACTIVE_RECT_COLOR
            };

            rectangle.setOptions(options);

            this.activeRectangle = rectangle;
        };


        return DtGoogleMap;
    }
})();