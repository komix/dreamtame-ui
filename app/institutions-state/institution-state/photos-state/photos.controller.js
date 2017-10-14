(function () {
    'use strict';
    angular
        .module('app')
        .controller('InstitutionPhotosController', InstitutionPhotosController);

    InstitutionPhotosController.$inject = ['$scope', '$rootScope', '$stateParams', 'users', 'MediaItemsList',
        'instService', 'photoswipe'];

    function InstitutionPhotosController($scope, $rootScope, $stateParams, users, MediaItemsList,
                                         instService, photoswipe) {
        var vm = this;

        var instId = $stateParams.id;
        var listeners = [];

        vm.photos = new MediaItemsList({
            type: 'photos',
            institutionId: instId
        });

        vm.isOwnerOrAdmin = isOwnerOrAdmin;
        vm.initPhotoSwipe = initPhotoSwipe;
        vm.loadMore = loadMore;

        activate();

        function activate() {
            getInst();

            vm.photos.getRemote();

            listeners.push($rootScope.$on('photo-added', function(e, photo) {
                vm.photos.add(photo, true);
            }));

            listeners.push($rootScope.$on('photo-deleted', function(event, payload) {
                vm.photos.removeById(payload.id);
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

        function isOwnerOrAdmin() {
            if (!vm.inst || !users.current) { return false; }
            var isOwner = parseInt(vm.inst.owner) === parseInt(users.current.id);
            var isAdmin = users.current.role === 'admin' || users.current.role === 'superman';

            return isAdmin || isOwner;
        }

        function initPhotoSwipe(index) {
            photoswipe.init(angular.copy(vm.photos.data), index);
        }

        function loadMore() {
            if (vm.photos.isLoadInProcess || vm.photos.allMediaItemsLoaded) { return false; }

            vm.photos.getRemote();
        }

    }

})();

