(function () {
'use strict';

angular
.module('app')
.controller('ManageVideoModalController', ManageVideoModalController);

ManageVideoModalController.$inject = ['$rootScope', 'videoConfig', '$uibModalStack', 'videos'];

function ManageVideoModalController($rootScope, videoConfig, $uibModalStack, videos) {
    var vm = this;

    vm.config = videoConfig;
    vm.video = {};
    vm.image = {};

    var selImgConfig = {
        aspectRatio: 1,
        resizeTo: 700,
        buttonUnder: true
        //onChange: onInstImageChange
    };

    vm.selImgConfig = selImgConfig;

    vm.submit = submit;

    activate();

    function activate() {

    }

    function submit() {
        vm.video.imgUrl = vm.image.src;
        vm.video.instanceId = vm.config.instId;
        vm.video.instance = vm.config.instance;

        videos.add(vm.video).then(function(response) {
            afterSubmit(response.data);
        })
    }

    function afterSubmit(mediaItem) {
        if (vm.config.onSuccess) {
            vm.config.onSuccess(mediaItem);
        }
    }

}

})();