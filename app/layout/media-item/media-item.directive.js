(function () {
    'use strict';

    angular
        .module('app')
        .directive('mediaItem', mediaItem);

    mediaItem.$inject = [];
    /* @ngInject */
    function mediaItem() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: MediaItemController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'layout/media-item/media-item.html',
            scope: {
                item: '=',
                isOwner: '='
            }
        };

        return directive;
    }

    MediaItemController.$inject = ['$element'];

    function MediaItemController($element) {
        var vm = this;

        activate();



        function activate() {
        }




    }
})();