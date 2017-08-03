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
                shareEl: false
            };

            items = _.filter(items, function(elem){
                return !elem.ytbUrl && !elem.ytbId;
            });

            service.gallery = new PhotoSwipe(service.element, PhotoSwipeUI_Default, items, options);

            service.gallery.init();
        }

    }
})();