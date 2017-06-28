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
                imageThumb: '=?',
                editable: '=?'
            }
        };

        return directive;
    }

    SelectImageController.$inject = ['$scope', '$element', 'imageService'];

    function SelectImageController($scope, $element, imageService) {
        var vm = this;
        vm.triggerInput = triggerInput;
        vm.onImageLoaded = onImageLoaded;

        vm.inputId = 'input-' + chance.guid();
        vm.image = '';

        function onImageLoaded(file) {
            imageService.resize(file).then(function(response) {
                vm.image = response.imgUrl;
                vm.imageThumb = response.thumbUrl;
                $('#' + vm.inputId).val(null);
            });
        }


        function triggerInput() {
            $('#' + vm.inputId).click();
        }
    }

})();