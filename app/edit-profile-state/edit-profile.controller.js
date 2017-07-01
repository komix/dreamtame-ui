(function () {
    'use strict';
    angular
        .module('app')
        .controller('EditProfileController', EditProfileController);

    EditProfileController.$inject = ['$stateParams', '$state', 'users', 'photosService'];

    function EditProfileController($stateParams, $state, users, photosService) {
        var vm = this;

        var userId = $stateParams.id;

        vm.isImageEditable = parseInt(userId) === parseInt(users.current.id);

        vm.selImgConfig = {
            aspectRatio: 1,
            resizeTo: 700,
            mWidth: 500,
            buttonUnder: true,
            onChange: onProfileImageChange
        };

        vm.submit = submit;

        activate();

        function activate() {
            getUser();
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
            if (!photoId) { return false; }
            photosService.get(photoId).then(function(response) {
                vm.image = response.data;
            });
        }

        function submit() {
            users.update(users.current.id, vm.user).then(function() {
                $state.go('profile', {id: users.current.id});
            })
        }
    }

})();

