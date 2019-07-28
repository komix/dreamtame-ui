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
                inst: '=',
                isCategoryButtonVisible: '=?'
            }
        };

        return directive;
    }

    InstBlockController.$inject = ['categoriesService'];

    function InstBlockController(categoriesService) {
        var vm = this;

        vm.getCategoryTitle = getCategoryTitle;

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

        function getCategoryTitle(id) {
            var category = categoriesService.getInstanceById(id);
            if (!category) { return ''; }

            return category.ukName;
        }

    }
})();