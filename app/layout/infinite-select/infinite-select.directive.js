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

    InfiniteSelectController.$inject = ['$rootScope', 'helper'];
    /* @ngInject */

    function InfiniteSelectController($rootScope, helper) {
        var vm = this;
        vm.selected = null;
        vm.selectedSubLoc = {};

        vm.onBaseOptionChanged = onBaseOptionChanged;
        vm.onOptionChanged = onOptionsChanged;

        activate();

        function activate() {
            if (vm.config.preselected) {
                var hash = getHash(vm.config.tree);
                var preselectedCat = hash[vm.config.preselected];
                var hierarchy = getHierarchy(hash, preselectedCat);

                helper.updateArrayByReference(vm.config.selectedList, hierarchy);

                vm.selected = hierarchy[0];

                _.each(hierarchy, function(elem, index) {
                    if (hierarchy[index + 1]) {
                        vm.selectedSubLoc[elem.id] = hierarchy[index + 1]
                    }
                });
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
            vm.config.selectedList.length = 0;
            vm.config.selectedList.push(vm.selected);
            emitSelectChange();
        }

        function onOptionsChanged(id, index) {
            vm.config.selectedList.splice(index + 1, vm.config.selectedList.length);

            if (vm.selectedSubLoc && vm.selectedSubLoc[id]) {
                vm.config.selectedList.push(vm.selectedSubLoc[id]);
                emitSelectChange();
            }
        }

        function emitSelectChange() {
            if (vm.config.onSelectChange) {
                vm.config.onSelectChange();
            }
        }
    }

})();
