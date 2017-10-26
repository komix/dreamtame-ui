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

    FreeSearchController.$inject = ['$element', '$timeout', '$state', 'loadGoogleMaps', 'categoriesService'];
    /* @ngInject */
    function FreeSearchController($element, $timeout, $state, loadGoogleMaps, categoriesService) {
        var vm = this;

        var infSelectConfig = {
            tree: null,
            propertyToShow: 'ukName',
            preselected: vm.config.categoryId || null,
            selectedList: [],
            onSelectChange: onCategorySelectChange
        };

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
                label: 'Шукати у радіусі трьох кілометрів'
            }
        ];

        vm.setRadius = setRadius;
        vm.isRadiusOptionActive = isRadiusOptionActive;

        ///////////////

        activate();

        ///////////////

        function activate() {
            getCategories();
            loadGoogleMaps.mapsInitialized.then(function() {
                $timeout(function() {
                    attachPlacesInput();
                    parseConfig();
                });
            });
        }

        function getCategories() {
            return categoriesService.getTree().then(function(response) {
                infSelectConfig.tree = response.data;
                vm.infSelectConfig = infSelectConfig;
            });
        }

        function attachPlacesInput() {
            var input = $element.find('#free-search-place-input')[0];
            var autocomplete = new google.maps.places.Autocomplete(input);

            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                var position = getPosition(place);

                $state.go('search.results-state', {
                    lat: position.lat,
                    lng: position.lng,
                    address: input.value
                }, {reload: false, notify: false});
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
            $state.go('search.results-state', {
               radius: vm.config.radius
            }, {reload: false, notify: false});
        }

        function isRadiusOptionActive(value) {
            return vm.config.radius === value;
        }

        function onCategorySelectChange() {
            if (!vm.infSelectConfig.selectedList.length) { return false }

            var lastSelected = _.last(vm.infSelectConfig.selectedList);

            $state.go('search.results-state', {
                categoryId: lastSelected ? lastSelected.id : null
            }, {
                reload: false,
                notify: false,
                inherit: true
            });
        }
    }
})();