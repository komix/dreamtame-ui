(function() {
    'use strict';

    angular
        .module('app')
        .directive('infiniteSelect', infiniteSelect);

    infiniteSelect.$inject = [];
    /* @ngInject */
    function infiniteSelect() {
        var directive = {
            bindToController: true,
            controller: InfiniteSelectController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: '/layout/infinite-select/infinite-select.html',
            scope: {
                config: '='
            }
        };

        return directive;
    }

    InfiniteSelectController.$inject = ['$rootScope'];
    /* @ngInject */

    function InfiniteSelectController($rootScope) {
        var vm = this;

        vm.selected = {};
        vm.selectedSubLoc = {};

        vm.onBaseOptionChanged = onBaseOptionChanged;
        vm.onOptionChanged = onOptionsChanged;

        activate();

        function activate() {
            if (preselectedCat) {
                var hash = getHash(vm.config.tree);
                var preselectedCat = hash[vm.config.preselected];
                var hierarchy = getHierarchy(hash, preselectedCat);

                vm.selectedOptionsList = hierarchy;
                vm.selected = hierarchy[0];

                _.each(hierarchy, function(elem, index) {
                    if (hierarchy[index + 1]) {
                        vm.selectedSubLoc[elem.id] = hierarchy[index + 1]
                    }
                });
            } else {
                vm.selectedOptionsList = [];
            }
        }

        function getHash(tree) {
            var hash = {};

            writeHash(tree);

            function writeHash(cats) {
                _.each(cats, function(elem) {
                    hash[elem.id] = elem;
                    if (elem.children) {
                        writeHash(elem.children);
                    }
                });
            }

            return hash;
        }

        function getHierarchy(hash, preselected) {
            var hierarchy = [];

            hierarchy.push(preselected);
            pushParent(preselected);

            function pushParent(category) {
                var parent = hash[category.parent];
                if (parent) {
                    hierarchy.unshift(parent);
                    pushParent(parent);
                }
            }

            return hierarchy;
        }

        function onBaseOptionChanged() {
            vm.selectedOptionsList.length = 0;
            vm.selectedOptionsList.push(vm.selected);
        }

        function onOptionsChanged(id, index) {
            vm.selectedOptionsList.splice(index + 1, vm.selectedOptionsList.length);

            if (vm.selectedSubLoc && vm.selectedSubLoc[id]) {
                vm.selectedOptionsList.push(vm.selectedSubLoc[id]);
            }

        }
    }

})();
