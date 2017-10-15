(function () {
    'use strict';

    angular
        .module('app')
        .directive('institutionThumbnail', institutionThumbnail);

    institutionThumbnail.$inject = [];
    /* @ngInject */
    function institutionThumbnail() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: InstitutionThumbnailController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'layout/institution-thumbnail/institution-thumbnail.view.html',
            scope: {
                institution: '=',
                options: '=?'
            }
        };

        return directive;
    }

    InstitutionThumbnailController.$inject = ['categoriesService'];

    function InstitutionThumbnailController(categoriesService) {
        var vm = this;

        vm.getCategoryTitle = getCategoryTitle;

        activate();

        function activate() {

        }

        function getCategoryTitle(id) {
            var category = categoriesService.getInstanceById(id);
            if (!category) { return ''; }

            return category.ukName;
        }
    }
})();