(function () {
    'use strict';
    angular
        .module('app')
        .controller('DashboardManageLocationController', DashboardManageLocationController);

    DashboardManageLocationController.$inject = ['$rootScope', '$stateParams', 'Location'];

    function DashboardManageLocationController($rootScope, $stateParams, Location) {
        var vm = this;

        var locationId = $stateParams.id;
        var mapConfig = {
            id: 'locations-map-' + chance.guid(),
            searchField: true,
            eventHandlers: {
                onPlaceChange: onPlaceChange,
                onRectangleSubmitted: onAreaSubmitted
            },
            zoom: 13,
            placeMarker: true
        };

        vm.mapConfig = mapConfig;
        vm.isMapVisible = false;

        vm.submit = submit;
        vm.editArea = editArea;

        activate();

        function activate() {
            if (locationId) {
                vm.isCreateState = false;
                vm.location = new Location({id: locationId});
                vm.actionName = 'Редагувати локацію';
                vm.submitActionTitle = 'Зберегти';

                vm.location.getRemote().then(function() {
                    vm.mapConfig.editableAreas = true;
                    vm.mapConfig.center = {
                        lat: vm.location.lat,
                        lng: vm.location.lng
                    };
                    vm.mapConfig.rectangles = vm.location.areas;
                    vm.isMapVisible = true;
                });
            } else {
                vm.isMapVisible = true;
                vm.location = new Location();
                vm.isCreateState = true;
                vm.actionName = 'Додати локацію';
                vm.submitActionTitle = 'Додати';
            }
        }

        function getRequest() {
            return vm.isCreateState ? vm.location.create() : vm.location.update();
        }

        function submit() {
            _.each(vm.form.$error.required, function(elem) {
                elem.$setDirty();
            });

            if (!vm.form.$valid) { return false; }
            if (!vm.location.areCoordsDefined()) { return false }

            getRequest().then(function(response) {
                console.log(response);
            })
        }

        function onPlaceChange(coords) {
            vm.location.setCoords(coords);
        }

        function onAreaSubmitted(area) {
            console.log(area);

            if (area.id) {
                vm.location.updateArea(area);
            } else {
                area.locationId = vm.location.id;
                vm.location.createArea(area);
            }

        }

        function editArea(areaId) {
            $rootScope.$emit('area-edit-clicked', {id: areaId});
        }
    }
})();

