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
                markup: '='
            }
        };

        return directive;
    }

    DotDotDotController.$inject = ['$element', '$scope', '$timeout'];

    function DotDotDotController($element, $scope, $timeout) {
        var vm = this;
        var charToRemove = [ ' ', ',', ';', '.', '!', '?' ];

        activate();

        function activate() {
            $timeout(function() {
                $element.dotdotdot({
                    lastCharacter: {
                        remove: charToRemove
                    }
                })
            });

            $(window).on('resize', _.debounce(onResize, 100));
        }

        function onResize() {
            $element.trigger("update");
        }
    }


})();
