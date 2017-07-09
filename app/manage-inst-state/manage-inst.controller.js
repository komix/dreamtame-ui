(function () {
    'use strict';
    angular
        .module('app')
        .controller('ManageInstController', ManageInstController);

    ManageInstController.$inject = ['$q', '$stateParams', 'users', 'instService', 'categoriesService', 'photosService'];

    function ManageInstController($q, $stateParams, users, instService, categoriesService, photosService) {
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
            propertyToShow: 'ukName',
            preselected: null,
            selectedList: [],
            requiredAll: true
        };

        var googleMapsConfig = {
            id: 'inst-map-' + chance.guid(),
            lat: 49.841012,
            lng: 24.028260,
            searchField: true
        };

        vm.instId = instId;
        vm.selImgConfig = selImgConfig;
        vm.isCreateState = true;
        vm.isLoadInProcess = true;

        vm.submit = submit;

        activate();

        function activate() {
            if (instId) {
                vm.isCreateState = false;
                vm.actionName = 'Редагувати групу:';
                vm.submitActionTitle = 'Зберегти зміни';
            } else {
                vm.isImageEditable = true;
                vm.actionName = 'Створити групу:';
                vm.submitActionTitle = 'Створити групу';
                vm.inst = {};
            }

            $q.all(getPromises()).then(function(responses) {
                vm.isLoadInProcess = false;
                vm.infSelectConfig = infSelectConfig;
                vm.googleMapsConfig = googleMapsConfig;
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
                vm.isImageEditable = parseInt(vm.inst.owner) === parseInt(users.current.id);
                infSelectConfig.preselected = vm.inst.categoryId;
                presetGeography(vm.inst);
                getInstPhoto(vm.inst.photoId);
            });
        }

        function presetGeography(inst) {
            if (inst.lat && inst.lng && inst.address) {
                googleMapsConfig.lat = inst.lat;
                googleMapsConfig.lng = inst.lng;
                googleMapsConfig.address = inst.address;
            }
        }

        function onInstImageChange(image) {
            photosService.add(image).then(function(response) {
                if (!vm.isCreateState) {
                    instService.update(vm.inst.id, {photoId: response.data.id});
                }

                vm.inst.photoId = response.data.id;
            });
        }

        function getInstPhoto(photoId) {
            if (!photoId) { return false; }
            photosService.get(photoId).then(function(response) {
                vm.image = response.data;
            });
        }

        function getSubmitPromise() {
            return vm.isCreateState ? instService.add : instService.update;
        }

        function submit() {
            _.each(vm.form.$error.required, function(elem) {
                elem.$setDirty();
            });

            if (!vm.form.$valid) { return false; }

            if (vm.googleMapsConfig.address) {
                vm.inst.address = vm.googleMapsConfig.address;
                vm.inst.lat =  vm.googleMapsConfig.lat;
                vm.inst.lng =  vm.googleMapsConfig.lng;
            }

            vm.inst.categoryId = _.last(vm.infSelectConfig.selectedList).id;

            var promise = getSubmitPromise();

            promise(vm.inst).then(function(response) {
                $state.go('institution', {id: response.data.id});
            });

        }
    }

})();

