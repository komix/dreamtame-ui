(function () {
    'use strict';

    angular
        .module('app')
        .directive('dotDotDot', dotDotDot);

    dotDotDot.inject = [];

    function dotDotDot() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: DotDotDotController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'layout/dot-dot-dot/dot-dot-dot.html',
            scope: {
                markup: '=',
                height: '=?'
            }
        };

        return directive;
    }

    DotDotDotController.$inject = ['$element', '$scope', '$timeout'];

    function DotDotDotController($element, $scope, $timeout) {
        var vm = this;

        vm.needsTruncate = true;
        vm.isTruncated = false;

        vm.toggleTruncate = toggleTruncate;

        activate();

        function activate() {
            firstTruncate();
            $(window).on('resize', _.debounce(onResize, 100));
        }

        function firstTruncate() {
            $timeout(function() {
                if (isTruncateNecessary()) {
                   truncate(true);
                } else {
                    vm.needsTruncate = false;
                }
            });
        }

        function truncate(value) {
            if (!vm.needsTruncate) { return false; }
            var height = value ? vm.height : 10000;

            $($element.find('.text')).shave(height);
            vm.isTruncated = value;
        }

        function isTruncateNecessary() {
            return $element.find('.text').height() >= parseInt(vm.height);
        }

        function onResize() {
            truncate(true);
        }

        function toggleTruncate() {
            if (!vm.needsTruncate) { return false; }
            truncate(!vm.isTruncated);
        }
    }


})();
