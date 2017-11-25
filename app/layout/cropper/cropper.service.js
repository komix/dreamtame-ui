(function() {
    'use strict';

    angular
        .module('app')
        .factory('cropperService', cropperService);

    cropperService.$inject = ['$q', '$uibModal', 'imageService', 'modalService'];
    /* @ngInject */
    function cropperService($q, $modal, imageService, modalService) {
        var imageData = {};

        var service = {
            defer: null,
            blob: null,
            aspectRatio: null,
            cropWidth: null,
            mCropWidth: null,
            imageData: imageData,
            modal: null,
            config: {},
            openCropper: openCropper,
            sendImage: sendImage,
            reset: reset,
            closeModal: closeModal
        };

        return service;


        function openCropper(blob, aspectRatio, cropWidth, mCropWidth, config) {
            service.defer = $q.defer();
            service.blob = blob;
            service.aspectRatio = aspectRatio;
            service.cropWidth = cropWidth;
            service.mCropWidth = mCropWidth;
            service.config = config;

            if (blob) {
                service.modal = $modal.open({
                    templateUrl: 'layout/cropper/cropper-modal.html',
                    controller: 'CropController',
                    controllerAs: 'vm',
                    size: 'lg',
                    backdrop: 'static'
                })
            }

            return service.defer.promise;
        }

        function sendImage(image) {
            var request = service.mCropWidth
                ? imageService.deployCroppedImage(image, service.config)
                : imageService.deployImageString(image, service.config);

            request.then(function(result) {
                service.defer.resolve(result);
                reset();
            });
        }

        function closeModal() {
            service.modal.close();
        }

        function reset() {
            service.defer = null;
            service.blob = null;
            service.aspectRatio = null;
            service.cropWidth = null;
            service.mCropWidth = null;
            service.imageData = {};
            service.config = {};
        }
    }

})();
