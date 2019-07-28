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

        vm.videos = [
            {
                imgUrl: "http://api.dreamtame.com/uploads/image5a1498e7dbf829.65187248.jpeg",
                ytbUrl: "https://www.youtube.com/watch?v=qgzO9PWYscg"
            },
            {
                imgUrl: "https://api.dreamtame.com/uploads/institution/19/image5a856405565fa1.21091535.jpeg",
                ytbUrl: "https://www.youtube.com/watch?v=rBtLql-VU5E"
            },
            {
                imgUrl: "https://api.dreamtame.com/uploads/institution/47/image5b0b0317c7a1a2.79874967.jpeg",
                ytbUrl: "https://www.youtube.com/watch?v=H25dmeqv4sE"
            },
            {
                imgUrl: "https://api.dreamtame.com/uploads/institution/12/image5a725c4ba1a0c4.46209069.jpeg",
                ytbUrl: "https://www.youtube.com/watch?v=G9kMQ6_3fT8"
            }

        ];

        function showVideo(video) {
            modalService.showVideoModal({ytbUrl: video.ytbUrl});
        }
    }

})();