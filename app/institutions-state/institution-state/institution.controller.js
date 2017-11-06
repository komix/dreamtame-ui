(function () {
    'use strict';
    angular
        .module('app')
        .controller('InstitutionController', InstitutionController);

    InstitutionController.$inject = ['$rootScope', '$state', '$stateParams', 'users', 'photosService',
        'instService', 'categoriesService', 'photoswipe', 'modalService'];

    function InstitutionController($rootScope, $state, $stateParams, users, photosService,
                                   instService, categoriesService, photoswipe, modalService) {
        var vm = this;

        var instId = $stateParams.id;
        vm.instId = instId;

        vm.selImgConfig = {
            aspectRatio: 1,
            resizeTo: 700,
            mWidth: 500,
            instance: 'institution',
            instanceId: instId,
            onChange: onInstImageChange
        };

        vm.addImageConfig = {
            instId: instId,
            rawDownload: true,
            aspectRatio: 1,
            resizeTo: 640,
            instance: 'institution',
            instanceId: instId
        };

        vm.isStoryDescriptionTruncated = true;

        vm.isOwnerOrAdmin = isOwnerOrAdmin;
        vm.initPhotoSwipe = initPhotoSwipe;
        vm.isSubStateActive = isSubStateActive;
        vm.showAddVideoModal = showAddVideoModal;

        activate();

        function activate() {
            getInst();
            if ($state.current.name === 'institutions.institution') {
                $state.go('institutions.institution.photos', {id: instId});
            }
        }

        function getInst() {
            instService.get(instId).then(function(response) {
                vm.inst = response.data;
                vm.isImageEditable = parseInt(vm.inst.owner) === parseInt(users.current.id);
                categoriesService.activeId = vm.inst.categoryId;

                setMapConfig();
                getInstPhoto(vm.inst.photoId);
                emitActiveCatChangeEvent(vm.inst.categoryId);
            });
        }

        function setMapConfig() {
            vm.mapConfig = {
                id: 'inst-map-' + chance.guid(),
                lat: vm.inst.lat,
                lng: vm.inst.lng,
                address: vm.inst.address,
                title: vm.inst.title
            }
        }

        function emitActiveCatChangeEvent(catId) {
            $rootScope.$emit('activeCatChange', catId);
        }

        function onInstImageChange(image) {
            photosService.add(image).then(function(response) {
                instService.update(vm.inst.id, {photoId: response.data.id});
            });
        }

        function getInstPhoto(photoId) {
            if (!photoId) { return false; }
            photosService.get(photoId).then(function(response) {
                vm.image = response.data;
            });
        }

        function isOwnerOrAdmin() {
            if (!vm.inst || !users.current) { return false; }
            var isOwner = parseInt(vm.inst.owner) === parseInt(users.current.id);
            var isAdmin = users.current.role === 'admin' || users.current.role === 'superman';

            return isAdmin || isOwner;
        }

        function initPhotoSwipe(items, index) {
            var trueIndex = getPhotoTrueIndex(index);
            photoswipe.init(angular.copy(items), trueIndex);
        }

        function isSubStateActive(name) {
            if (!$state.current || !$state.current.name) { return false; }
            return $state.current.name.includes(name);
        }

        function showAddVideoModal() {
            modalService.showManageVideoModal({
                instId: instId,
                title: 'Додати відео',
                instance: 'institution',
            })
        }
    }

})();

