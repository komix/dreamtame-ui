(function () {
    'use strict';
    angular
        .module('app')
        .controller('ManageInstController', ManageInstController);

    ManageInstController.$inject = ['$q', '$stateParams', 'users', 'instService', 'categoriesService'];

    function ManageInstController($q, $stateParams, users, instService, categoriesService) {
        var vm = this;

        var instId = $stateParams.id;

        var selImgConfig = {
            aspectRatio: 1,
            resizeTo: 700,
            mWidth: 500,
            buttonUnder: true,
            onChange: onInstImageChange
        };

        var infSelectConfig = {
            tree: null,
            preselected: null
        };

        vm.instId = instId;
        vm.selImgConfig = selImgConfig;
        vm.isCreateState = true;
        vm.isLoadInProcess = true;

        activate();

        function activate() {
            if (instId) {
                vm.isCreateState = false;
                vm.actionName = 'Редагувати групу';
            } else {
                vm.isImageEditable = true;
                vm.actionName = 'Створити групу';
                vm.inst = {};
            }

            $q.all(getPromises()).then(function(responses) {
                vm.isLoadInProcess = false;
                vm.infSelectConfig = infSelectConfig;
            })
        }

        function getPromises() {
            var promises = [];

            promises.push(getCategoriesPromise());

            if (!vm.isCreateState) {
                promises.push(getInstPromise())
            }

            return promises;
        }

        function getCategoriesPromise() {
            return categoriesService.getTree().then(function(response) {
                infSelectConfig.tree = response.data;
            });
        }

        function getInstPromise() {
            return instService.get(vm.instId).then(function(response) {
                vm.inst = response.data;
                getInstPhoto(vm.inst.photoId);
                vm.isImageEditable = parseInt(vm.inst.owner) === parseInt(users.current.id);
                infSelectConfig.preselected = vm.inst.categoryId;
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

