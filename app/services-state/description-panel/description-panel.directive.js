(function () {
    'use strict';

    angular
        .module('app')
        .directive('descriptionPanel', descriptionPanel);

    descriptionPanel.$inject = [];
    /* @ngInject */
    function descriptionPanel() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: DescriptionPanelController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'services-state/description-panel/description-panel.html',
            scope: {
                config: '=?'
            }
        };

        return directive;
    }

    DescriptionPanelController.$inject = [];

    function DescriptionPanelController() {
        var vm = this;

    }

})();