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

    MediaItemController.$inject = ['photosService', 'confirm', '$rootScope', 'videos'];

    function MediaItemController(photosService, confirm, $rootScope, videos) {
        var vm = this;

        vm.onRemoveClick = onRemoveClick;

        activate();

        function activate() {

        }

        function onRemoveClick(e) {
            var callback, message, eventToEmmit;
            e.stopPropagation();

            if (vm.item.src) {
                callback = photosService.remove;
                message = 'Ви впевнені, що хочете видалити фото?';
                eventToEmmit = 'photo-deleted';
            } else {
                callback = videos.remove;
                message = 'Ви впевнені, що хочете видалити відео?';
                eventToEmmit = 'video-deleted';
            }

            confirm.open(message).then(function(result) {
                if (result) {
                    callback(vm.item.id).then(function() {
                        $rootScope.$emit(eventToEmmit, {id: vm.item.id});
                    })
                }
            });

        }

    }
})();