(function () {
    'use strict';
    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$stateParams', 'users', 'photosService'];

    function ProfileController($stateParams, users, photosService) {
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
               console.log(response);
                users.update(users.current.id, {photoId: response.data.id});
            });
        }

        function getProfilePhoto(photoId) {
            if (!photoId) { return false; }
            photosService.get(photoId).then(function(response) {
                vm.image = response.data;
            });
        }
    }

})();

