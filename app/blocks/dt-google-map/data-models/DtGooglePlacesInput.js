(function() {
    'use strict';

    angular
        .module('app')
        .factory('DtGooglePlacesInput', dtGooglePlacesInput);

    dtGooglePlacesInput.$inject = [];
    /* @ngInject */
    function dtGooglePlacesInput() {
        _(DtGooglePlacesInput.prototype).extend(EventEmitter.prototype);

        function DtGooglePlacesInput(params) {
            this.inputEl = null;
            this.autocomplete = null;

            this.init(params);
        }

        DtGooglePlacesInput.prototype.init = function(params) {
            if (!params || !params.inputEl) { throw new Error('Incorrect arguments for gmap'); }

            this.inputEl = params.inputEl;

            this.autocomplete = new google.maps.places.Autocomplete(this.inputEl);

            this.attachEventHandlers();
        };

        DtGooglePlacesInput.prototype.attachEventHandlers = function() {
            var _this = this;

            google.maps.event.addListener(this.autocomplete, 'place_changed', function() {
                var place = _this.autocomplete.getPlace();
                _this.emit('place-changed', {place: place, position: _this.getPlacePosition(place)});
            });
        };

        DtGooglePlacesInput.prototype.getPlacePosition = function(place) {
            if (!place || !place.geometry) { throw new Error('Incorrect arguments for .getPlacePosition()'); }

            return {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
        };

        return DtGooglePlacesInput;
    }
})();