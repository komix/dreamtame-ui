(function () {
    'use strict';

    angular
        .module('app')
        .directive('preloader', preloader);

    preloader.$inject = [];
    /* @ngInject */
    function preloader() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: PreloaderController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'layout/preloader/preloader.html',
            scope: {}
        };

        return directive;
    }

    PreloaderController.$inject = [];

    function PreloaderController() {
        var vm = this;


    }
})();