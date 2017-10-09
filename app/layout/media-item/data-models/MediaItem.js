(function() {
    'use strict';

    angular
        .module('app')
        .factory('MediaItem', mediaItem);

    mediaItem.$inject = [];
    /* @ngInject */
    function mediaItem() {
        _(MediaItem.prototype).extend(EventEmitter.prototype);

        function MediaItem(params) {
            this.id = null;
            this.src = '';
            this.msrc = '';
            this.sqr = '';
            this.w = 0;
            this.h = 0;
            this.instId = null;
            this.imgUrl = '';
            this.ytbUrl = '';

            this.init(params);
        }

        MediaItem.prototype.init = function(params) {
            if (!params) {
                throw new Error('MediaItem: Invalid params!');
            }

            if (params.id) { this.id = params.id; }
            if (params.src) { this.src = params.src; }
            if (params.msrc) { this.msrc = params.msrc; }
            if (params.sqr) { this.sqr = params.sqr; }
            if (params.w) { this.w = params.w; }
            if (params.h) { this.h = params.h; }
            if (params.instId) { this.instId = params.instId; }
            if (params.imgUrl) { this.imgUrl = params.imgUrl; }
            if (params.ytbUrl) { this.ytbUrl = params.ytbUrl; }
        };

        MediaItem.prototype.getData = function() {

        };

        MediaItem.prototype.create = function() {

        };

        return MediaItem;
    }
})();