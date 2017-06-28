(function() {
    'use strict';

    angular
        .module('app')
        .factory('modalService', modalService);

    modalService.$inject = ['$q', '$uibModal', '$uibModalStack'];

    function modalService($q, $uibModal, $uibModalStack) {
    	var defer;
    	var service = {
    		showCategoryModal: showCategoryModal,
            confirmCreation: confirmCreation
    	};

    	return service;

    	function showCategoryModal(category) {
    		defer = $q.defer();
	        var modalInstance = $uibModal.open({
	            animation: true,
	            templateUrl: 'dashboard-state/gallery/categories/category-manage-modal/category-manage-modal.html',
	            controller: 'CategoryManageModalController',
	            controllerAs: 'vm',
	            size: 'md',
                resolve: {
                    category: category
                }
	        });
	        return defer.promise;
        }

        function confirmCreation(response) {
            defer.resolve(response)
            $uibModalStack.dismissAll();
        }

    }
})();