(function () {
    'use strict';

    angular
        .module('app')
        .directive('shareButtons', shareButtons);

    shareButtons.$inject = [];
    /* @ngInject */
    function shareButtons() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: ShareButtonsController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'layout/share-buttons/share-buttons.html',
            scope: {
                image: '=',
                text: '=',
                hashtags: '=',
                url: '='
            }
        };

        return directive;
    }

    ShareButtonsController.$inject = ['$element', 'cropperService'];

    function ShareButtonsController($element, cropperService) {
        var vm = this;

        console.log(vm.text);

    }

})();