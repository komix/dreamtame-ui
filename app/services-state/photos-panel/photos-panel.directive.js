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
                h: 1333,
                id: 97,
                instId: 11,
                sqr: "https://api.dreamtame.com/uploads/institution/11/image5a724a5aa970b5.91796770.jpeg",
                src: "https://api.dreamtame.com/uploads/institution/11/image5a724a5b645a08.53322081.jpeg",
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
                h: 1333,
                id: 55,
                instId: 6,
                sqr: "https://api.dreamtame.com/uploads/institution/6/image5a6bbb3d3c92c1.99800870.jpeg",
                src: "https://api.dreamtame.com/uploads/institution/6/image5a6bbb40251e25.95275201.jpeg",
                w: 2000
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