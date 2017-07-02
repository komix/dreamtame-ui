(function () {
    'use strict';
    angular
        .module('app')
        .controller('ManageInstController', ManageInstController);

    ManageInstController.$inject = ['$stateParams', 'users', 'instService'];

    function ManageInstController($stateParams, users, instService) {
        var vm = this;

        var instId = $stateParams.id;

        var selImgConfig = {
            aspectRatio: 1,
            resizeTo: 700,
            mWidth: 500,
            buttonUnder: true,
            onChange: onInstImageChange
        };

        vm.selImgConfig = selImgConfig;
        vm.isCreateState = true;

        activate();

        function activate() {
            if (instId) {
                getInst(instId);
                vm.isCreateState = false;
                vm.actionName = 'Редагувати групу';
            } else {
                vm.isImageEditable = true;
                vm.actionName = 'Створити групу';
                vm.inst = {};
            }
        }

        function getInst(id) {
            instService.get(id).then(function(response) {
                vm.inst = response.data;
                getInstPhoto(vm.inst.photoId);
                vm.isImageEditable = parseInt(vm.inst.owner) === parseInt(users.current.id);
            });
        }

        function onInstImageChange(image) {
            photosService.add(image).then(function(response) {
                instService.update(users.current.id, {photoId: response.data.id});
            });
        }

        function getInstPhoto(photoId) {
            if (!photoId) { return false; }
            photosService.get(photoId).then(function(response) {
                vm.image = response.data;
            });
        }
    }

})();

