(function () {
    'use strict';

    angular
        .module('app')
        .directive('videosPanel', videosPanel);

    videosPanel.$inject = [];
    /* @ngInject */
    function videosPanel() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: VideosPanelController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'services-state/videos-panel/videos-panel.html',
            scope: {
                config: '=?'
            }
        };

        return directive;
    }

    VideosPanelController.$inject = [];

    function VideosPanelController() {
        var vm = this;
        
    }

})();