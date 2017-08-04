(function() {
    angular.module('app')
        .directive('dGoogleMap', dGoogleMap);

    dGoogleMap.$inject = [];

    function dGoogleMap() {
        var directive = {
            bindToController: true,
            controller: DGoogleMapController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'blocks/google-maps/google-map.html',
            scope: {
                config: '='
            }
        };

        return directive;
    }

    DGoogleMapController.$inject = ['$scope', '$element', 'loadGoogleMaps', '$timeout'];

    function DGoogleMapController($scope, $element, loadGoogleMaps, $timeout) {
        var vm = this;

        activate();

        function activate() {
            loadGoogleMaps.mapsInitialized.then(function() {
                $timeout(function() {
                    initialize();
                    setMarker(vm.location);
                });
            });

            $scope.$on('$destroy', function() {
                vm.map = null;
            })
        }

        function initialize() {
            if (vm.config.searchField) {
                attachPlacesInput();
            }

            vm.location = new google.maps.LatLng(vm.config.lat, vm.config.lng);

            vm.mapOptions = {
                zoom: 18,
                center: vm.location
            };

            var mapEl = document.getElementById(vm.config.id);
            vm.map = new google.maps.Map(mapEl, vm.mapOptions);
        }

        function attachPlacesInput() {
            var input = $element.find('#dt-google-map-autocomplete')[0];
            var autocomplete = new google.maps.places.Autocomplete(input);

            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                var position = getPosition(place);

                vm.config.address = input.value;

                setMarker(position);
                centerMap(position);
            });
        }

        function getPosition(place) {
            if (!place || !place.geometry) { return false; }

            return {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
        }

        function setMarker(position) {
            if (!position) { return false; }

            if (!vm.marker) {
                vm.marker = new google.maps.Marker({
                    position: position,
                    map: vm.map
                });
            } else {
                vm.marker.setPosition(position);
            }

            vm.config.lat = position.lat;
            vm.config.lng = position.lng;
        }

        function centerMap(position) {
            vm.map.setCenter(position);
        }
    }

})();



