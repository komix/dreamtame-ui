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
                sqr: "http://api.dreamtame.com/uploads/image5a08df056425e6.53476633.jpeg",
                src: "http://api.dreamtame.com/uploads/institution/1/image5a08df06c94657.36927916.jpeg",
                w: 2000,
                h: 3000
            },
            {
                id: 33,
                imgUrl: "",
                sqr: "http://api.dreamtame.com/uploads/image5a08de3f44c336.64463728.jpeg",
                src: "http://api.dreamtame.com/uploads/institution/1/image5a08de41111318.77617367.jpeg",
                w: 700,
                h: 1050
            },
            {
                id: 33,
                imgUrl: "",
                sqr: "http://api.dreamtame.com/uploads/image5a08de188d7000.09375501.jpeg",
                src: "http://api.dreamtame.com/uploads/institution/1/image5a08de19b864a2.41667634.jpeg",
                w: 2000,
                h: 1333
            },
            {
                id: 33,
                imgUrl: "",
                sqr: "http://api.dreamtame.com/uploads/image5a08de2e99c9c4.95530298.jpeg",
                src: "http://api.dreamtame.com/uploads/institution/1/image5a08de313efdf4.85026771.jpeg",
                w: 2000,
                h: 3000
            }
        ];

        function initPhotoSwipe(index) {
            photoswipe.init(angular.copy(vm.photos), index);
        }
    }

})();