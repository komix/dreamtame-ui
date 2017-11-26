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
                radius: parseInt($stateParams.radius) || 1
            }
        };

        vm.loadMoreResults = loadMoreResults;
        vm.areAllInstitutionsDisplayed = areAllInstitutionsDisplayed;
        vm.areNoInstitutionsFound = areNoInstitutionsFound;
        vm.getNotFoundMessage = getNotFoundMessage;


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

        function areAllInstitutionsDisplayed() {
            return vm.institutions && vm.institutions.allInstitutionsLoaded && vm.institutions.length;
        }

        function areNoInstitutionsFound() {
            return vm.institutions && vm.institutions.allInstitutionsLoaded && !vm.institutions.length;
        }

        function getNotFoundMessage() {
            var message;



            if (institutionsListParams.searchParams.radius === 1) {
                message = 'В межах одного кілометра у радіусі вказаної адреси' +
                    ' не знайдено жодного закладу, спробуйте збільшити радіус пошуку';
            }

            if (institutionsListParams.searchParams.radius === 2) {
                message = 'В межах двох кілометрів у радіусі вказаної адреси' +
                    ' не знайдено жодного закладу, спробуйте збільшити радіус пошуку';
            }

            if (institutionsListParams.searchParams.radius === 3) {
                message = 'На жаль у системі поки не зареєстровано' +
                    ' жодного закладу поруч із вказаною адресою.';
            }

            return message;
        }
    }

})();
