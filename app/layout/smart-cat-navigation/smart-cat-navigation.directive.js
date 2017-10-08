(function () {
    'use strict';

    angular
        .module('app')
        .directive('smartCatNavigation', smartCatNavigation);

    smartCatNavigation.$inject = [];
    /* @ngInject */
    function smartCatNavigation() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: SmartCatNavigationController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'layout/smart-cat-navigation/smart-cat-navigation.html',
            scope: {
                activeId: '=?'
            }
        };

        return directive;
    }

    SmartCatNavigationController.$inject = ['$rootScope', '$state', 'categoriesService', 'helper'];

    function SmartCatNavigationController($rootScope, $state, categoriesService, helper) {
        var vm = this;

        vm.catHistory = [];
        vm.isLoadInProcess = false;
        vm.catsAreLoaded = false;

        vm.onCatClick = onCatClick;
        vm.switchBack = switchBack;
        vm.getAbr = getAbr;
        vm.getFirstLetters = getFirstLetters;
        vm.hasAbstractCats = hasAbstractCats;
        vm.isThumbActive = isThumbActive;
        vm.isCatActive = isCatActive;

        activate();

        function activate() {
            getTree();

            $rootScope.$on('activeCatChange', function(e, activeId) {
                vm.activeId = activeId;

                if (!vm.isLoadInProcess) {
                    getTree();
                }
            });
        }

        function getTree() {
            vm.isLoadInProcess = true;
            categoriesService.getTree().then(function(response) {
                vm.isLoadInProcess = false;
                vm.catHistory.length = 0;
                var tree = response.data;
                var baseCat = {
                    id: 'base',
                    name: 'general',
                    ukName: 'вcі категорії',
                    abr: 'всі',
                    children: tree
                };

                vm.catsAreLoaded = true;

                if (vm.activeId) {
                    setActiveCat(baseCat, vm.activeId);
                } else {
                    changeActiveCat(baseCat);
                }

            });
        }

        function setActiveCat(tree, activeId) {
            var hash = helper.getHash(tree, 'id');
            var preselected = hash[activeId];
            var hierarchy = helper.getHierarchy(hash, preselected);

            hierarchy.splice(-1, 2);
            vm.catHistory.push(tree);
            vm.catHistory = vm.catHistory.concat(hierarchy);
            vm.activeCat = vm.catHistory[vm.catHistory.length - 1];
        }

        function onCatClick(newCat) {
            if (newCat.children && newCat.children.length) {
                changeActiveCat(newCat);
            } else {
                $state.go('institutions.category', {id: newCat.id});
            }
        }

        function changeActiveCat(newCat) {
            vm.activeCat = newCat;
            vm.catHistory.push(vm.activeCat);
        }

        function switchBack(index) {
            if (vm.catHistory.length === 1) { return false; }

            if (!_.isUndefined(index)) {
                vm.catHistory.splice(index + 1);
            } else {
                vm.catHistory.splice(vm.catHistory.length - 1, 1)
            }

            vm.activeCat = _.last(vm.catHistory);
        }

        function getAbr(cat) {
            return cat.abr ? cat.abr : getFirstLetters(cat.ukName);
        }

        function getFirstLetters(title) {
            if (!title) { return ''; }

            var firstLetters = [];
            var words = title.split(' ');

            _.each(words, function(elem) {
                firstLetters.push(elem[0]);
            });

            return firstLetters.join('');
        }

        function hasAbstractCats() {
            if (!vm.activeCat) { return false; }
            var result = false;

            _.each(vm.activeCat.children, function(elem) {
                if (elem.children) { result = true }
            });

            return result;
        }

        function isThumbActive(id) {
            if (!vm.activeCat) { return false; }
            return vm.activeCat.id === id;
        }

        function isCatActive(id) {
            return categoriesService.activeId === id;
        }


    }
})();