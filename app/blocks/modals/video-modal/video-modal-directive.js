(function () {
    'use strict';

    angular
        .module('app')
        .controller('VideoModalController', VideoModalController);


    VideoModalController.$inject = ['videoConfig', '$scope'];

    function VideoModalController(videoConfig, $scope) {
        var vm = this;

        vm.config = videoConfig;



        activate();

        function activate() {
            //vm.player.playVideo();

            $scope.$on('youtube.player.ready', function ($event, player) {
                vm.player.playVideo();
            });
        }


    }

})();