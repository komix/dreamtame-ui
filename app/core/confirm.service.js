(function() {
    'use strict';

    angular
        .module('app')
        .factory('confirm', confirm);

    confirm.$inject = ['$q', '$uibModal', '$uibModalStack'];

    function confirm($q, $uibModal, $uibModalStack) {
    	var defer;
    	var service = {
    		openConfirmModal: openConfirmModal,
    		resolve: resolve
    	};

    	return service;

    	function openConfirmModal(message) {
            defer = $q.defer();
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'layout/modals/confirm-modal/confirm-modal.html',
                controller: 'confirmModalController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    message: function() {
                        return message;
                    }
                }
            });
            return defer.promise;
    	}
    	
        function resolve(response) {
        	defer.resolve(response);
            $uibModalStack.dismissAll();
        }
    }
})();
