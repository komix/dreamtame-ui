(function() {
    'use strict';

    angular
        .module('app')
        .directive('truncate', truncate);

    truncate.$inject = [];
    /* @ngInject */
    function truncate() {
        var directive = {
            restrict: 'A',
            bindToController: true,
            controller: TruncateController,
            controllerAs: 'vm',
            scope: {
                minHeight: '=?',
                fitParent: '=?',
                maxHeight: '=?',
                character: '=?',
                append: '=?',
                toggle: '=?',
                appendClick: '=?'
            }
        };

        return directive;
    }

    TruncateController.$inject = ['$element', '$timeout', '$scope', '$compile'];

    function TruncateController($element, $timeout, $scope, $compile) {
        var vm = this;

        var elem = $($element);
        var parent = elem.parent();

        vm.CHARACTER_CLASS = 'shave-append';
        vm.character = angular.isDefined(vm.character) ? vm.character : '...';

        vm.truncate = truncate;
        vm.truncateByParent = truncateByParent;
        vm.truncateByMinHeight = truncateByMinHeight;
        vm.truncateByElemenHeight = truncateByElemenHeight;
        vm.shave = shave;
        vm.toggleClick = toggleClick;
        vm.isPartOfTextHidden = isPartOfTextHidden;

        ///////////////

        activate();

        ///////////////

        function activate() {
            $timeout(truncate);
            $(window).on('resize', truncate);

            $scope.$on('$destroy', function() {
                $(window).off('resize', truncate);
            });
        }

        function truncate() {
            if (vm.originalMaxHeight) {
                elem.css('max-height', vm.originalMaxHeight);
            }

            vm.isManuallyShown = false;

            if (vm.$showLessButton) {
                vm.$showLessButton.remove();
            }

            if (vm.fitParent) {
                truncateByParent();
            } else {
                truncateByElemenHeight();
            }
        }

        function truncateByParent() {
            var parentHeight = getParentHeight();
            var truncateHeight = parentHeight > vm.minHeight ? parentHeight : vm.minHeight;

            elem.css('max-height', truncateHeight);
            vm.shave(truncateHeight)
        }

        function truncateByMinHeight() {
            vm.shave(vm.minHeight);
        }

        function truncateByElemenHeight() {
            var elemHeight = elem.height();
            var truncateHeight = elemHeight < vm.minHeight ? vm.minHeight : elemHeight;
            vm.shave(truncateHeight);
        }

        function getParentHeight() {
            return parent.height();
        }

        function shave(maxheight) {
            var character = vm.character;

            if (vm.append) {
                if (vm.appendClick) {
                    character += '<span' +
                        ' class="' + vm.CHARACTER_CLASS + '"' +
                        ' data-ng-click="vm.appendClick()"' +
                        '>' + vm.append + '</span>';
                } else {
                    character += ' ' + vm.append;
                }
            } else if (vm.toggle) {
                vm.lastHeight = maxheight;
                character += ' ' + '<span ' +
                    ' class="' + vm.CHARACTER_CLASS + ' truncate-addon"' +
                    ' data-ng-click="vm.toggleClick()"' +
                    '>' + 'більше' + '</span>';
            }

            elem.shave(maxheight, {character: character});

            if ((vm.append && vm.appendClick) || vm.toggle) {
                $compile($element.find('.shave-append'))($scope);
            }

            vm.isTruncated = true;
        }

        function cancelShave() {
            vm.isTruncated = false;
            elem.shave(11111111);
            vm.originalMaxHeight = elem.css('max-height');
            elem.css('max-height', 'none');

            var templateElement = angular.element('<span ' +
                ' class="' + 'less-span-button truncate-addon' + '"' +
                ' data-ng-click="vm.toggleClick()"' +
                    'data-ng-show="vm.isManuallyShown"' +
                '>' + 'менше' + '</span>');

            var clonedElement = $compile(templateElement)($scope, function(clonedElement, scope) {
                vm.$showLessButton = clonedElement;
                elem.append(vm.$showLessButton);
            });

            vm.isManuallyShown = true;
        }

        function isPartOfTextHidden() {
            return !!elem.find('.js-shave-char').length;
        }

        function toggleClick() {
            vm.isTruncated ? cancelShave() : truncate();
        }
    }
})();