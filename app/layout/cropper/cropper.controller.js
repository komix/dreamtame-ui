(function() {
    'use strict';
    angular
        .module('app')
        .controller('CropController', CropController);

    CropController.$inject = ['$q', '$scope', 'Cropper',
        '$timeout', '$uibModalStack', 'cropperService'];

    function CropController($q, $scope, Cropper,
                            $timeout, $uibModalStack, cropperService) {
        var vm = this;
        var file, data;

        vm.cropperService = cropperService;
        vm.cropper = {};
        vm.cropperProxy = 'cropper.first';
        vm.blob = cropperService.blob;
        vm.cropWidth = cropperService.cropWidth;
        vm.aspectRatio = cropperService.aspectRatio;

        vm.showEvent = 'show';
        vm.hideEvent = 'hide';

        vm.isLoadInProcess = false;

        vm.options = {
            maximize: true,
            aspectRatio: cropperService.aspectRatio,
            crop: function(dataNew) {
                data = dataNew;
            }
        };

        vm.getPreview = getPreview;
        vm.scale = scale;
        vm.sendFile = sendFile;
        vm.clear = clear;
        vm.isPreviewVisible = isPreviewVisible;
        vm.isCropperVisible = isCropperVisible;

        activate();

        function activate() {
            vm.isLoadInProcess = true;
            Cropper.encode(file = cropperService.blob).then(function(dataUrl) {
                vm.dataUrl = dataUrl;
                $timeout(showCropper);
            });
        }

        function getPreview() {
            if (!cropperService.blob || !data) return;

            vm.isLoadInProcess = true;

            Cropper.crop(file, data).then(Cropper.encode).then(function(dataUrl) {
                (vm.preview || (vm.preview = {})).dataUrl = dataUrl;
                cropperService.imageData.cropped = dataUrl;
                scale();
            })
        }

        function clear() {
            if (!vm.cropper.first) return;
            vm.cropper.first('clear');
        }

        function scale() {
            Cropper.crop(file, data)
                .then(function(blob) {
                    return Cropper.scale(blob, {width: cropperService.cropWidth});
                })
                .then(Cropper.encode).then(function(dataUrl) {
                    (vm.preview || (vm.preview = {})).dataUrl = dataUrl;
                    vm.isLoadInProcess = false;
                });
        }

        function getMinified() {
            var defered = $q.defer();

            Cropper.crop(cropperService.blob, data)
                .then(function(blob) {
                    return Cropper.scale(blob, {width: cropperService.mCropWidth});
                })
                .then(Cropper.encode).then(function(dataUrl) {
                    defered.resolve(dataUrl);
                });

            return defered.promise;
        }

        function sendFile() {
            if (!cropperService.mCropWidth) {
                cropperService.sendImage(vm.preview.dataUrl);
                cropperService.closeModal();
                return false;
            }

            var image = {
              src: vm.preview.dataUrl,
              msrc: null
            };

            getMinified().then(function(imgString) {
                image.msrc = imgString;
                cropperService.sendImage(image);
                cropperService.closeModal();
            });
        }

        function showCropper() {
            vm.isLoadInProcess = false;
            $scope.$broadcast(vm.showEvent);
        }

        function hideCropper() {
            $scope.$broadcast(vm.hideEvent);
        }

        function isPreviewVisible() {
            return vm.preview && vm.preview.dataUrl && !vm.isLoadInProcess;
        }

        function isCropperVisible() {
            var isPreviewVisible = vm.preview && vm.preview.dataUrl;
            return vm.dataUrl && !isPreviewVisible && !vm.isLoadInProcess;
        }

    }



})();





