(function () {
    'use strict';

    angular
        .module('app')
        .directive('locationString', locationString);

    locationString.$inject = [];
    /* @ngInject */
    function locationString() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: LocationStringController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'layout/location-string/location-string.view.html',
            scope: {
                mapConfig: '=?'
            }
        };

        return directive;
    }

    LocationStringController.$inject = ['modalService'];

    function LocationStringController(modalService) {
        var vm = this;

        vm.openLocationModal = openLocationModal;

        activate();

        function activate() {

        }

        function openLocationModal() {
            modalService.showMapModal(vm.mapConfig);
        }


    }
})();