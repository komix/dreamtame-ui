(function () {
    'use strict';

    angular
        .module('app')
        .directive('photosPanel', photosPanel);

    photosPanel.$inject = [];
    /* @ngInject */
    function photosPanel() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: PhotosPanelController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'services-state/photos-panel/photos-panel.html',
            scope: {
                config: '=?'
            }
        };

        return directive;
    }

    PhotosPanelController.$inject = ['photoswipe'];

    function PhotosPanelController(photoswipe) {
        var vm = this;

        vm.initPhotoSwipe = initPhotoSwipe;

        vm.photos = [
            {
                id: 33,
                imgUrl: "",
                msrc: "http://api.dreamtame.com/uploads/institution/3/image5a36fc396e46e0.10830222.jpeg",
                sqr: "http://api.dreamtame.com/uploads/institution/3/image5a36fc38803536.14267207.jpeg",
                src: "http://api.dreamtame.com/uploads/institution/3/image5a36fc39ade532.35662277.jpeg",
                w: 2000,
                h: 1333
            },
            {
                id: 33,
                imgUrl: "",
                msrc: "http://api.dreamtame.com/uploads/institution/3/image5a36fc396e46e0.10830222.jpeg",
                sqr: "http://api.dreamtame.com/uploads/institution/3/image5a36fc38803536.14267207.jpeg",
                src: "http://api.dreamtame.com/uploads/institution/3/image5a36fc39ade532.35662277.jpeg",
                w: 2000,
                h: 1333
            },
            {
                id: 33,
                imgUrl: "",
                msrc: "http://api.dreamtame.com/uploads/institution/3/image5a36fc396e46e0.10830222.jpeg",
                sqr: "http://api.dreamtame.com/uploads/institution/3/image5a36fc38803536.14267207.jpeg",
                src: "http://api.dreamtame.com/uploads/institution/3/image5a36fc39ade532.35662277.jpeg",
                w: 2000,
                h: 1333
            },
            {
                id: 33,
                imgUrl: "",
                msrc: "http://api.dreamtame.com/uploads/institution/3/image5a36fc396e46e0.10830222.jpeg",
                sqr: "http://api.dreamtame.com/uploads/institution/3/image5a36fc38803536.14267207.jpeg",
                src: "http://api.dreamtame.com/uploads/institution/3/image5a36fc39ade532.35662277.jpeg",
                w: 2000,
                h: 1333
            }
        ];

        function initPhotoSwipe(index) {
            photoswipe.init(angular.copy(vm.photos), index);
        }
    }

})();