(function () {
    'use strict';

    angular
        .module('app')
        .directive('addImage', addImage);

    addImage.$inject = [];
    /* @ngInject */
    function addImage() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: AddImageController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'layout/add-image/add-image.view.html',
            scope: {
                config: '=?'
            }
        };

        return directive;
    }

    AddImageController.$inject = ['imageService', 'photosService', 'cropperService', '$rootScope'];

    function AddImageController(imageService, photosService, cropperService, $rootScope) {
        var vm = this;
        vm.triggerInput = triggerInput;
        vm.onImageLoaded = onImageLoaded;

        vm.inputId = 'input-' + chance.guid();

        function onImageLoaded(file) {
            if (vm.config.aspectRatio) {
                deployWithPlaceholder(file).then(function(result) {
                    deployImage(result);
                })
            } else {
                imageService.deployRawImage(file, vm.config).then(function(result) {
                    deployImage(result);
                });
            }
        }

        function deployWithPlaceholder(file) {
            return cropperService.openCropper(file, vm.config.aspectRatio, vm.config.resizeTo, null, vm.config)
                .catch(function(err) {
                    console.log(err);
                })
                .then(function(response){
                    if (!response) { return false; }
                    var imgSrc = response.data ? response.data.src : response.src;
                    return imageService.deployRawImage(file, vm.config, imgSrc);
                });
        }

        function deployImage(imageData) {
            if (vm.config.usrId) {
                imageData.usrId = vm.config.usrId;
            }

            if (vm.config.instId) {
                imageData.instId = vm.config.instId;
            }

            vm.config.isLoadInProcess = true;

            photosService.add(imageData).then(function(response) {
                vm.config.isLoadInProcess = false;
                $rootScope.$emit('photo-added', response.data);
            });
        }

        function triggerInput() {
            $('#' + vm.inputId).click();
        }
    }

})();