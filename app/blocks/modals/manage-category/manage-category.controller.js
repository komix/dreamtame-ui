(function () {
    'use strict';

    angular
        .module('app')
        .controller('ManageCatModalController', ManageCatModalController);


    ManageCatModalController.$inject = ['$rootScope', 'parentCat', 'cat', 'categoriesService', '$uibModalStack'];

    function ManageCatModalController($rootScope, parentCat, cat, categoriesService, $uibModalStack) {
        var vm = this;

        vm.parentCat = parentCat;
        vm.submit = submit;
        vm.cat = {};


        activate();

        function activate() {
            if (parentCat && parentCat.id) {
                vm.cat.parent = parentCat.id;

                if (vm.parentCat.id === 1) {
                    vm.modalMessage = 'Створити базову категорію:';
                } else {
                    vm.modalMessage = 'Створити підкатегорію для: "' + parentCat.ukName + '":';
                }
            } else if (cat && cat.id) {
                vm.cat = cat;
            }
        }

        function submit() {
            getSubmitAction().then(function(data){
                $rootScope.$emit('categories-changed');
                $uibModalStack.dismissAll();
            });

        }

        function getSubmitAction() {
            if (vm.cat.id) {
                return categoriesService.update(vm.cat);
            } else {
                return categoriesService.add(vm.cat);
            }
        }
    }

})();