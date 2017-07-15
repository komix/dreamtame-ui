(function () {
    'use strict';

    angular
        .module('app')
        .controller('MapModalController', MapModalController);


    MapModalController.$inject = ['$rootScope', 'mapConfig', '$uibModalStack'];

    function MapModalController($rootScope, mapConfig, $uibModalStack) {
        var vm = this;

        vm.mapConfig = mapConfig;



        activate();

        function activate() {

        }


    }

})();