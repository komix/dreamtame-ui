(function() {
    'use strict';

    angular
        .module('app')
        .factory('cropperService', cropperService);

    cropperService.$inject = ['$q', '$uibModal', 'imageService'];
    /* @ngInject */
    function cropperService($q, $modal, imageService) {
        var imageData = {};

        var service = {
            defer: null,
            blob: null,
            aspectRatio: null,
            cropWidth: null,
            mCropWidth: null,
            imageData: imageData,
            openCropper: openCropper,
            sendImage: sendImage,
            reset: reset
        };

        return service;


        function openCropper(blob, aspectRatio, cropWidth, mCropWidth) {
            service.defer = $q.defer();
            service.blob = blob;
            service.aspectRatio = aspectRatio;
            service.cropWidth = cropWidth;
            service.mCropWidth = mCropWidth;

            if (blob) {
                $modal.open({
                    templateUrl: 'layout/cropper/cropper-modal.html',
                    controller: 'CropController',
                    controllerAs: 'vm',
                    size: 'lg'
                })
            }

            return service.defer.promise;
        }

        function sendImage(image) {
            imageService.deployCroppedImage(image).then(function(result) {
                service.defer.resolve(result);
                reset();
            });
        }


        function reset() {
            service.defer = null;
            service.blob = null;
            service.aspectRatio = null;
            service.cropWidth = null;
            service.mCropWidth = null;
            service.imageData = {};
        }


    }

})();
