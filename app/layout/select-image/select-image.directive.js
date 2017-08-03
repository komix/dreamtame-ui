(function () {
    'use strict';

    angular
        .module('app')
        .directive('selectImage', selectImage);

    selectImage.$inject = [];
    /* @ngInject */
    function selectImage() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: SelectImageController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'layout/select-image/select-image.html',
            scope: {
                image: '=',
                editable: '=?',
                config: '=?'
            }
        };

        return directive;
    }

    SelectImageController.$inject = ['$scope', '$element', 'imageService', 'cropperService'];

    function SelectImageController($scope, $element, imageService, cropperService) {
        var vm = this;
        vm.triggerInput = triggerInput;
        vm.onImageLoaded = onImageLoaded;

        vm.inputId = 'input-' + chance.guid();

        var defaultConfig = {
            aspectRatio: 1,
            resizeTo: 700
        };

        if (vm.config) {
            vm.config.aspectRatio = vm.config.aspectRatio || defaultConfig.aspectRatio;
            vm.config.resizeTo = vm.config.resizeTo || defaultConfig.resizeTo;
        } else {
            vm.config = defaultConfig;
        }

        function onImageLoaded(file) {
            cropperService.openCropper(file, vm.config.aspectRatio, vm.config.resizeTo, vm.config.mWidth)
                .catch(function(err) {
                    console.log(err);
                })
                .then(function(response){
                    if (!response) { return false; }
                    vm.image = response.data ? response.data : response;

                    if (vm.config.onChange) {
                        vm.config.onChange(response);
                    }
                });

            $('#' + vm.inputId).val(null);
        }

        function triggerInput() {
            $('#' + vm.inputId).click();
        }
    }

})();