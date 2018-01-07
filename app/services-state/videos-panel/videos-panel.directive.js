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

    VideosPanelController.$inject = ['modalService'];

    function VideosPanelController(modalService) {
        var vm = this;

        vm.showVideo = showVideo;

        vm.videos = [{
            imgUrl: "http://api.dreamtame.com/uploads/image5a1498e7dbf829.65187248.jpeg",
            ytbUrl: "https://www.youtube.com/watch?v=qgzO9PWYscg"
        }];

        function showVideo(video) {
            modalService.showVideoModal({ytbUrl: video.ytbUrl});
        }
    }

})();