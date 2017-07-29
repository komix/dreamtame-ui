(function () {
    'use strict';

    angular
        .module('app')
        .directive('dtPhotoswipe', photoswipe);

    photoswipe.$inject = [];
    /* @ngInject */
    function photoswipe() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: PhotoswipeController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'layout/dt-photoswipe/photoswipe.html',
            scope: {}
        };

        return directive;
    }

    PhotoswipeController.$inject = ['$element', 'photoswipe'];

    function PhotoswipeController($element, photoswipe) {
        var vm = this;
        photoswipe.element = $element[0];

        activate();

        function activate() {
        }


    }

})();