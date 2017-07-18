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

    AddImageController.$inject = ['$scope', '$element', 'imageService', 'cropperService', 'photosService'];

    function AddImageController($scope, $element, imageService, cropperService, photosService) {
        var vm = this;
        vm.triggerInput = triggerInput;
        vm.onImageLoaded = onImageLoaded;

        vm.inputId = 'input-' + chance.guid();

        function onImageLoaded(file) {
            imageService.deployRawImage(file).then(function(response) {
                deployImage(response);
            });
        }

        function deployImage(imageData) {
            if (vm.config.usrId) {
                imageData.usrId = vm.config.usrId;
            }

            if (vm.config.instId) {
                imageData.instId = vm.config.instId;
            }

            photosService.add(imageData).then(function(response) {

            });
        }

        function triggerInput() {
            $('#' + vm.inputId).click();
        }
    }

})();