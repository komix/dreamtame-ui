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
            restrict: 'E',
            templateUrl: 'layout/institution-block/institution-block.html',
            scope: {
                inst: '='
            }
        };

        return directive;
    }

    InstBlockController.$inject = ['$element', 'photosService'];

    function InstBlockController($element, photosService) {
        var vm = this;

        activate();



        function activate() {
            setMapConfig();
            getInstPhoto(vm.inst.photoId);
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

        function getInstPhoto(photoId) {
            if (!photoId) { return false; }
            photosService.get(photoId).then(function(response) {
                vm.image = response.data;
            });
        }


    }
})();