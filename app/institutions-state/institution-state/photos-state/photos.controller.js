(function () {
    'use strict';
    angular
        .module('app')
        .controller('InstitutionPhotosController', InstitutionPhotosController);

    InstitutionPhotosController.$inject = ['$scope', '$rootScope', '$stateParams', 'users', 'photosService',
        'instService', 'photoswipe'];

    function InstitutionPhotosController($scope, $rootScope, $stateParams, users, photosService,
                                         instService, photoswipe) {
        var vm = this;

        var instId = $stateParams.id;
        var listeners = [];

        vm.isOwnerOrAdmin = isOwnerOrAdmin;
        vm.initPhotoSwipe = initPhotoSwipe;

        activate();

        function activate() {
            getInst();
            getInstPhotos();

            listeners.push($rootScope.$on('photo-added', function(e, photo) {
                vm.photos.unshift(photo);
            }));

            listeners.push($rootScope.$on('photo-deleted', function(event, payload) {
                removePhotoById(payload.id);
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

        function getInstPhotos() {
            return photosService.getByInstId(instId).then(function(response) {
                vm.photos = response.data;
            });
        }

        function isOwnerOrAdmin() {
            if (!vm.inst || !users.current) { return false; }
            var isOwner = parseInt(vm.inst.owner) === parseInt(users.current.id);
            var isAdmin = users.current.role === 'admin' || users.current.role === 'superman';

            return isAdmin || isOwner;
        }

        function initPhotoSwipe(index) {
            photoswipe.init(angular.copy(vm.photos), index);
        }

        function removePhotoById(id) {
            var deletedPhoto = _.find(vm.photos, function(elem) {
                return elem.id === id;
            });
            var index = _.indexOf(vm.photos, deletedPhoto);
            vm.photos.splice(index, 1);
        }

    }

})();

