(function () {
    'use strict';
    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$stateParams', 'InstitutionsList'];

    function SearchController($stateParams, InstitutionsList) {
        var vm = this;

        vm.searchConfig = {
            address: $stateParams.address || null,
            radius: parseInt($stateParams.radius) || 1
        };

        vm.loadMoreResults = loadMoreResults;


        activate();

        function activate() {
            if ($stateParams.lat && $stateParams.lng) {
                vm.institutions = new InstitutionsList({searchParams: {
                    point: {
                        lat: Number($stateParams.lat),
                        lng: Number($stateParams.lng)
                    },
                    radius: $stateParams.radius || 1
                }});

                vm.institutions.getRemote();
            }
        }

        function loadMoreResults() {
            vm.institutions.getRemote();
        }

    }

})();

