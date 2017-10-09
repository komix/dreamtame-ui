(function () {
    'use strict';
    angular
        .module('app')
        .controller('InstitutionVideosController', InstitutionVideosController);

    InstitutionVideosController.$inject = ['$scope', '$rootScope', '$stateParams', 'users', 'MediaItemsList',
        'instService', 'modalService'];

    function InstitutionVideosController($scope, $rootScope, $stateParams, users, MediaItemsList,
                                         instService,  modalService) {
        var vm = this;

        var instId = $stateParams.id;
        var listeners = [];

        vm.videos = new MediaItemsList({
            type: 'videos',
            institutionId: instId
        });

        vm.isOwnerOrAdmin = isOwnerOrAdmin;
        vm.showVideo = showVideo;
        vm.loadMore = loadMore;

        activate();

        function activate() {
            getInst();
            vm.videos.getRemote();

            listeners.push($rootScope.$on('video-added', function(e, photo) {
                vm.videos.unshift(photo);
            }));

            listeners.push($rootScope.$on('video-deleted', function(event, payload) {
                removeVideoById(payload.id);
            }));

            $scope.$on('$destroy', function() {
                _.each(listeners, function(elem) {
                    elem();
                })
            });
        }

        function getInst() {
            return instService.get(instId).then(function(response) {
                vm.inst = response.data;
            });
        }

        function showVideo(video) {
            modalService.showVideoModal({ytbUrl: video.ytbUrl});
        }

        function isOwnerOrAdmin() {
            if (!vm.inst || !users.current) { return false; }
            var isOwner = parseInt(vm.inst.owner) === parseInt(users.current.id);
            var isAdmin = users.current.role === 'admin' || users.current.role === 'superman';

            return isAdmin || isOwner;
        }

        function removeVideoById(id) {
            var deletedVideo = _.find(vm.videos, function(elem) {
                return elem.id === id;
            });
            var index = _.indexOf(vm.videos, deletedVideo);
            vm.videos.splice(index, 1);
        }

        function loadMore() {
            if (vm.videos.isLoadInProcess || vm.videos.allMediaItemsLoaded) { return false; }

            vm.videos.getRemote();
        }

    }

})();

