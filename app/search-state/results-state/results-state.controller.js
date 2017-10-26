(function () {
    'use strict';
    angular
        .module('app')
        .controller('ResultsStateController', ResultsStateController);

    ResultsStateController.$inject = ['$stateParams', 'InstitutionsList', 'categoriesService'];

    function ResultsStateController($stateParams, InstitutionsList, categoriesService) {
        var vm = this;

        var institutionsListParams = {
            searchParams: {
                point: {},
                radius: $stateParams.radius || 1
            }
        };

        vm.loadMoreResults = loadMoreResults;


        activate();

        function activate() {
            categoriesService.getTree().then(function() {
                if ($stateParams.categoryId) {
                    institutionsListParams.categoriesIdsList = categoriesService.getCategoryChildrenIds($stateParams.categoryId)
                }

                if ($stateParams.lat && $stateParams.lng) {
                    institutionsListParams.searchParams.point.lat = Number($stateParams.lat);
                    institutionsListParams.searchParams.point.lng = Number($stateParams.lng);

                    vm.institutions = new InstitutionsList(institutionsListParams);

                    vm.institutions.getRemote();
                }
            });
        }

        function loadMoreResults() {
            if (vm.institutions) {
                vm.institutions.getRemote();
            }
        }
    }

})();
