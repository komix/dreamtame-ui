(function () {
    'use strict';

    angular
        .module('app')
        .directive('photosPanel', photosPanel);

    photosPanel.$inject = [];
    /* @ngInject */
    function photosPanel() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: PhotosPanelController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'services-state/photos-panel/photos-panel.html',
            scope: {
                config: '=?'
            }
        };

        return directive;
    }

    PhotosPanelController.$inject = [];

    function PhotosPanelController() {
        var vm = this;

    }

})();