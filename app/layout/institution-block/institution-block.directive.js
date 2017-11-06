(function () {
    'use strict';

    angular
        .module('app')
        .directive('instBlock', instBlock);

    instBlock.$inject = [];
    /* @ngInject */
    function instBlock() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: InstBlockController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'layout/institution-block/institution-block.html',
            scope: {
                inst: '='
            }
        };

        return directive;
    }

    InstBlockController.$inject = [];

    function InstBlockController() {
        var vm = this;

        activate();

        function activate() {
            setMapConfig();
        }

        function setMapConfig() {
            vm.mapConfig = {
                id: 'inst-map-' + chance.guid(),
                lat: vm.inst.lat,
                lng: vm.inst.lng,
                address: vm.inst.address,
                title: vm.inst.title
            }
        }

    }
})();