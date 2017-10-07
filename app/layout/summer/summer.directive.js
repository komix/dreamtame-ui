(function() {
    'use strict';

    angular
        .module('app')
        .directive('summer', summer);

    summer.$inject = [];
    /* @ngInject */
    function summer() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: SummerController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: '/layout/summer/summer.html',
            scope: {
                text: '='
            }
        };

        return directive;
    }

    SummerController.$inject = ['imageService'];
    /* @ngInject */

    function SummerController(imageService) {
        var vm = this;

        vm.options = {
            height: 500,
            focus: true,

            toolbar: [
                ['edit',['undo','redo']],
                ['headline', ['style']],
                ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                // ['fontface', ['fontname']],
                ['textsize', ['fontsize']],
                ['fontclr', ['color']],
                ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                ['height', ['height']],
                ['insert', ['link','picture','video','hr', 'table']],
                ['view', ['fullscreen', 'codeview']],
                ['help', ['help']]
            ]
        };

        vm.onImageUploaded = onImageUploaded;
        vm.onPaste = onPaste;



        function onImageUploaded(file) {
            var reader  = new FileReader();
            reader.onloadend = function () {
                imageService.deployImageString(reader.result).then(function(data) {
                    $('#summernote').summernote('insertImage', data.data.src);
                });
            };
            reader.readAsDataURL(file[0]);
        }

        function onPaste(e) {
            console.log(e);
        }
    }

})();
