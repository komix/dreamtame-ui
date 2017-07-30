(function () {
    'use strict';

    angular
        .module('app')
        .controller('VideoModalController', VideoModalController);


    VideoModalController.$inject = ['videoConfig'];

    function VideoModalController(videoConfig) {
        var vm = this;

        vm.config = videoConfig;



        activate();

        function activate() {

        }


    }

})();