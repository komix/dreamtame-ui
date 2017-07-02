(function() {
    'use strict';

    angular
        .module('app')
        .directive('catTree', catTree);

    catTree.$inject = ['$compile'];
    /* @ngInject */
    function catTree($compile) {
        var directive = {
            transclude: true,
            replace: true,
            bindToController: true,
            controller: CatTreeController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'dashboard-state/categories/cat-tree/cat-tree.html',
            scope: {
                tree: '='
            },
            compile: function(tElement, tAttr, transclude) {
                var contents = tElement.contents().remove();
                var compiledContents;
                return function(scope, iElement, iAttr) {
                    if(!compiledContents) {
                        compiledContents = $compile(contents, transclude);
                    }
                    compiledContents(scope, function(clone, scope) {
                        iElement.append(clone);
                    });
                };
            }
        };

        return directive;
    }

    CatTreeController.$inject = ['$rootScope', 'modalService', 'confirm', 'categoriesService'];
    /* @ngInject */
    function CatTreeController($rootScope, modalService, confirm, categoriesService) {
        var vm = this;

        vm.toggleItemExpantion = toggleItemExpantion;
        vm.showAddCategoryModal = showAddCategoryModal;
        vm.showEditCategoryModal = showEditCategoryModal;
        vm.showDeleteCategoryModal = showDeleteCategoryModal;

        function toggleItemExpantion(item, event) {
            event.stopPropagation();

            if (item.children && item.children.length) {
                item.isExpanded = !item.isExpanded;
            }
        }

        function showAddCategoryModal(event, parent) {
            event.stopPropagation();
            modalService.showAddCatModal(parent);
        }

        function showEditCategoryModal(event, category) {
            event.stopPropagation();

            modalService.showEditCatModal(category);
        }

        function showDeleteCategoryModal(event, category) {
            event.stopPropagation();
            var message = 'Ви впевнені, що хочете видалити категорію "' + category.ukName + '"?';

            confirm.open(message).then(function(result) {
                if (result) {
                    categoriesService.remove(category.id).then(function(response) {
                        $rootScope.$emit('categories-changed');
                    })
                }
            })
        }


    }
})();
