(function () {
    'use strict';
    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$stateParams', 'users', 'photosService', 'InstitutionsList'];

    function ProfileController($stateParams, users, photosService, InstitutionsList) {
        var vm = this;

        var userId = $stateParams.id;

        vm.isImageEditable = parseInt(userId) === parseInt(users.current.id);
        vm.selImgConfig = {
            aspectRatio: 1,
            resizeTo: 700,
            mWidth: 500,
            onChange: onProfileImageChange
        };
        vm.logOut = logOut;

        activate();

        function activate() {
            getUser();
            vm.institutions = new InstitutionsList({ownerId: userId});
            vm.institutions.getRemote();
        }

        function logOut() {
            users.logout();
        }

        function getUser() {
            users.getUser(userId).then(function(response) {
                vm.user = response.data;
                getProfilePhoto(vm.user.photoId);
            });
        }

        function onProfileImageChange(image) {
            photosService.add(image).then(function(response) {
                users.update(users.current.id, {photoId: response.data.id});
            });
        }

        function getProfilePhoto(photoId) {
            if (!photoId) {
                vm.image = {
                    src: vm.user.smallPhotoUrl
                };

                return false;
            }
            photosService.get(photoId).then(function(response) {
                vm.image = response.data;
            });
        }
    }

})();

