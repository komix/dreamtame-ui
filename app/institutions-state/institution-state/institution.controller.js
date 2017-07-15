(function () {
    'use strict';
    angular
        .module('app')
        .controller('InstitutionController', InstitutionController);

    InstitutionController.$inject = ['$rootScope', '$stateParams', 'users', 'photosService', 'instService'];

    function InstitutionController($rootScope, $stateParams, users, photosService, instService) {
        var vm = this;

        var instId = $stateParams.id;

        vm.selImgConfig = {
            aspectRatio: 1,
            resizeTo: 700,
            mWidth: 500,
            onChange: onInstImageChange
        };

        vm.isOwnerOrAdmin = isOwnerOrAdmin;

        activate();

        function activate() {
            getInst();
        }

        function getInst() {
            instService.get(instId).then(function(response) {
                vm.inst = response.data;
                vm.isImageEditable = parseInt(vm.inst.owner) === parseInt(users.current.id);
                getInstPhoto(vm.inst.photoId);
                emitActiveCatChangeEvent(vm.inst.categoryId);
            });
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
    }

})();

