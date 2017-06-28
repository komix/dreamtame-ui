(function () {
    'use strict';
    angular.module('app')
        .factory('photoswipe', photoswipe);


    photoswipe.$inject = [];

    function photoswipe() {

        var service = {
            element: null,
            init: init
        };

        return service;

        function init(items, index) {

            var options = {
                index: index, // start at first slide
                backButtonHideEnabled: false,
                history: false,
                maxSpreadZoom: 2,
                //modal: false,
                shareEl: false,
                //barsSize: {top:0, bottom:0}
            };

            var gallery = new PhotoSwipe(service.element, PhotoSwipeUI_Default, items, options);

            gallery.init();
        }



    }
})();