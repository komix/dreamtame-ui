(function () {
    'use strict';

    angular
        .module('app')
        .directive('proposalsPanel', proposalsPanel);

    proposalsPanel.$inject = [];
    /* @ngInject */
    function proposalsPanel() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: ProposalsPanelController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'services-state/proposals-panel/proposals-panel.html',
            scope: {
                config: '=?'
            }
        };

        return directive;
    }

    ProposalsPanelController.$inject = [];

    function ProposalsPanelController() {
        var vm = this;

    }

})();