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
                isOwner: '=?'
            }
        };

        return directive;
    }

    MediaItemController.$inject = ['photosService', 'confirm', '$rootScope'];

    function MediaItemController(photosService, confirm, $rootScope) {
        var vm = this;

        vm.onRemoveClick = onRemoveClick;

        activate();

        function activate() {

        }

        function onRemoveClick() {
            if (vm.item.src) {
                var message = 'Ви впевнені, що хочете видалити фото?';

                confirm.open(message).then(function(result) {
                    if (result) {
                        photosService.remove(vm.item.id).then(function() {
                            $rootScope.$emit('media-item-deleted', {id: vm.item.id});
                        })
                    }
                });
            }
        }

    }
})();