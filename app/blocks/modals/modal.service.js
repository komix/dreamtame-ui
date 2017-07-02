(function() {
    'use strict';

    angular
        .module('app')
        .factory('modalService', modalService);

    modalService.$inject = ['$q', '$uibModal', '$uibModalStack'];

    function modalService($q, $uibModal, $uibModalStack) {
        var defer;
        var service = {
            showAddCatModal: showAddCatModal,
            showEditCatModal: showEditCatModal
        };

        return service;

        function showAddCatModal(parentCat) {
            $uibModal.open({
                animation: true,
                templateUrl: 'blocks/modals/manage-category/manage-category.modal.html',
                controller: 'ManageCatModalController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    parentCat: function() {
                        return parentCat;
                    },
                    cat: function() {
                        return 'category';
                    }
                }
            });
        }


        function showEditCatModal(cat) {
            $uibModal.open({
                animation: true,
                templateUrl: 'blocks/modals/manage-category/manage-category.modal.html',
                controller: 'ManageCatModalController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    parentCat: function() {
                        return null;
                    },
                    cat: function() {
                        return cat;
                    }
                }
            });
        }



    }



})();
