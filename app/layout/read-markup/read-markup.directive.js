
(function () {
    'use strict';

    angular
        .module('app')
        .directive('readMarkup', readMarkup);

    readMarkup.$inject = [];
    /* @ngInject */
    function readMarkup() {
        var directive = {
            bindToController: true,
            controller: ReadMarkupController,
            replace: true,
            templateUrl: 'layout/read-markup/read-markup.html',
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                markup: '='
            }
        };

        return directive;
    }

    ReadMarkupController.$inject = ['$sce', '$scope'];
    /* @ngInject */
    function ReadMarkupController($sce, $scope) {
        var vm = this;

        $scope.$watch('vm.markup', function(newV, oldV) {
            if (newV) {
                vm.markupToSHow = $sce.trustAsHtml(vm.markup);
            }
        });

        vm.getMarkup = getMarkup;

        function getMarkup() {
            return $sce.trustAsHtml(vm.markup);
        }
    }
})();