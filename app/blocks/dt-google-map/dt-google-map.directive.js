(function() {
    angular.module('app')
        .directive('dtGoogleMap', dtGoogleMap);

    dtGoogleMap.$inject = [];

    function dtGoogleMap() {
        var directive = {
            bindToController: true,
            controller: DtGoogleMapController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'blocks/dt-google-map/dt-google-map.view.html',
            scope: {
                config: '='
            }
        };

        return directive;
    }

    DtGoogleMapController.$inject = ['$rootScope', '$element', 'loadGoogleMaps', '$timeout', 'DtGoogleMap'];

    function DtGoogleMapController($rootScope, $element, loadGoogleMaps, $timeout, DtGoogleMap) {
        var vm = this;

        vm.addRectangle = addRectangle;
        vm.isAddAreaButtonVisible = isAddAreaButtonVisible;
        vm.submitActiveRectangle = submitActiveRectangle;

        activate();

        function activate() {
            loadGoogleMaps.mapsInitialized.then(function() {
                $timeout(function() {
                    initialize();
                });
            });

            $rootScope.$on('area-edit-clicked', onRectangleEditClicked);
        }

        function initialize() {
            var config = {
                mapEl: document.getElementById(vm.config.id),
                placesInputEl: document.getElementById('dt-google-map-autocomplete'),
                eventHandlers: vm.config.eventHandlers,
                editableAreas: vm.config.editableAreas,
                placeMarker: vm.config.placeMarker,
                center: vm.config.center,
                rectangles: vm.config.rectangles
            };

            if (vm.config.zoom) {
                config.zoom = vm.config.zoom;
            }

            vm.map = new DtGoogleMap(config)
        }

        function addRectangle() {
            vm.map.addRectangle();
        }

        function isAddAreaButtonVisible() {
            if (!vm.map) { return false; }
            return vm.config.editableAreas && !vm.map.activeRectangle;
        }

        function submitActiveRectangle() {
            _.each(vm.areaform.$error.required, function(elem) {
                elem.$setDirty();
            });

            if (!vm.areaform.$valid) { return false; }

            vm.map.submitActiveRectangle();
        }

        function onRectangleEditClicked(event, params) {
            vm.map.activateRectangle(params.id)
        }

    }

})();



