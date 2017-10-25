(function() {
    'use strict';

    angular
        .module('app')
        .directive('freeSearch', freeSearch);

    freeSearch.$inject = [];
    /* @ngInject */
    function freeSearch() {
        var directive = {
            bindToController: true,
            controller: FreeSearchController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'layout/free-search/free-search.view.html',
            scope: {
                config: '=?'
            }
        };

        return directive;
    }

    FreeSearchController.$inject = ['$element', '$timeout', '$state', 'loadGoogleMaps'];
    /* @ngInject */
    function FreeSearchController($element, $timeout, $state, loadGoogleMaps) {
        var vm = this;

        vm.radiusOptions = [
            {
                value: 1,
                name: '1 км',
                label: 'Шукати у радіусі одного кілометра'
            },
            {
                value: 2,
                name: '2 км',
                label: 'Шукати у радіусі двох кілометрів'
            },
            {
                value: 3,
                name: '3 км',
                label: 'Шукати у радіусі трьох кілометра'
            }
        ];

        vm.setRadius = setRadius;
        vm.isRadiusOptionActive = isRadiusOptionActive;

        ///////////////

        activate();

        ///////////////

        function activate() {
            loadGoogleMaps.mapsInitialized.then(function() {
                $timeout(function() {
                    attachPlacesInput();
                    parseConfig();
                });
            });
        }

        function attachPlacesInput() {
            var input = $element.find('#free-search-place-input')[0];
            var autocomplete = new google.maps.places.Autocomplete(input);

            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                var position = getPosition(place);

                $state.go('search', {
                    lat: position.lat,
                    lng: position.lng,
                    address: input.value
                });
            });
        }

        function parseConfig() {
            if (!_.isObject(vm.config)) { return false; }
        }

        function getPosition(place) {
            if (!place || !place.geometry) { return false; }

            return {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
        }

        function setRadius(value) {
            vm.config.radius = value;
            $state.go('search', {
               radius: vm.config.radius
            }, {reload: true});
        }

        function isRadiusOptionActive(value) {
            return vm.config.radius === value;
        }
    }
})();