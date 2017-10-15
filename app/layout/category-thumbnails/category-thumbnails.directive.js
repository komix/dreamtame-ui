(function () {
    'use strict';

    angular
        .module('app')
        .directive('categoryThumbnails', categoryThumbnails);

    categoryThumbnails.$inject = [];
    /* @ngInject */
    function categoryThumbnails() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: CategoryThumbnailController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'layout/category-thumbnails/category-thumbnails.view.html',
            scope: {
                categoryId: '=',
                options: '=?'
            }
        };

        return directive;
    }

    CategoryThumbnailController.$inject = ['categoriesService', 'InstitutionsList'];

    function CategoryThumbnailController(categoriesService, InstitutionsList) {
        var vm = this;

        var idsList = categoriesService.getCategoryChildrenIds(vm.categoryId);

        vm.institutions = new InstitutionsList({categoriesIdsList: idsList});

        vm.getCategoryTitle = getCategoryTitle;

        activate();

        function activate() {
            vm.institutions.getRemote();
        }

        function getCategoryTitle(id) {
            var category = categoriesService.getInstanceById(id);
            if (!category) { return ''; }

            return category.ukName;
        }
       
    }
})();