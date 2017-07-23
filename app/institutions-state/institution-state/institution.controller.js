(function () {
    'use strict';
    angular
        .module('app')
        .controller('InstitutionController', InstitutionController);

    InstitutionController.$inject = ['$rootScope', '$stateParams', 'users', 'photosService', 'instService', 'categoriesService'];

    function InstitutionController($rootScope, $stateParams, users, photosService, instService, categoriesService) {
        var vm = this;

        var instId = $stateParams.id;

        vm.selImgConfig = {
            aspectRatio: 1,
            resizeTo: 700,
            mWidth: 500,
            onChange: onInstImageChange
        };

        vm.addImageConfig = {
            instId: instId,
            rawDownload: true,
            aspectRatio: 1,
            resizeTo: 640
        };

        vm.isDescriptionShortened = true;

        vm.isOwnerOrAdmin = isOwnerOrAdmin;
        vm.toggleDeskriptionShortened = toggleDeskriptionShortened;

        activate();

        function activate() {
            getInst();
        }

        function getInst() {
            instService.get(instId).then(function(response) {
                vm.inst = response.data;
                vm.isImageEditable = parseInt(vm.inst.owner) === parseInt(users.current.id);
                categoriesService.activeId = vm.inst.categoryId;

                setMapConfig();
                getInstPhoto(vm.inst.photoId);
                getInstPhotos();
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

        function getInstPhotos() {
            photosService.getByInstId(instId).then(function(response) {
                vm.photos = response.data;
            });
        }

        function isOwnerOrAdmin() {
            if (!vm.inst || !users.current) { return false; }
            var isOwner = parseInt(vm.inst.owner) === parseInt(users.current.id);
            var isAdmin = users.current.role === 'admin' || users.current.role === 'superman';

            return isAdmin || isOwner;
        }

        function toggleDeskriptionShortened() {
            vm.isDescriptionShortened = !vm.isDescriptionShortened;
        }


    }

})();

