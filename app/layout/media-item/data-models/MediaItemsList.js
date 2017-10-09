(function() {
    'use strict';

    angular
        .module('app')
        .factory('MediaItemsList', mediaItemsList);

    mediaItemsList.$inject = ['photosService', 'videos', 'MediaItem'];
    /* @ngInject */
    function mediaItemsList(photosService, videos, MediaItem) {
        _(MediaItemsList.prototype).extend(EventEmitter.prototype);

        function MediaItemsList(params) {
            MediaItemsList.validate(params);

            this.institutionId = null;
            this.type = null;
            this.data = [];
            this.isLoadInProcess = false;
            this.allMediaItemsLoaded = false;

            this.init(params);
        }

        MediaItemsList.validate = function(params) {
            if (!params || !params.institutionId || !params.type) {
                console.log('MediaItemsList: Incorrect arguments!');
            }
        };

        MediaItemsList.prototype.init = function(params) {
            if (params.institutionId) { this.institutionId = params.institutionId; }
            if (params.type) { this.type = params.type; }
        };

        MediaItemsList.prototype.add = function(institution, unshift) {
            var newMediaItem = new MediaItem(institution);
            if (unshift) {
                this.data.unshift(newMediaItem);
            } else {
                this.data.push(newMediaItem);
            }
        };

        MediaItemsList.prototype.getById = function(id) {
            return _.find(this.data, function(elem) {
               return elem.id === id;
            });
        };

        MediaItemsList.prototype.removeById = function(id) {
            var _this = this;
            var item = this.getById(id);
            var index = _.indexOf(this.data, item);

            this.data.splice(index, 1);
        };

        MediaItemsList.prototype.addList = function(mediaItemsList) {
            var _this = this;

            if (!mediaItemsList.length) {
                this.allMediaItemsLoaded = true;
            }

            _.each(mediaItemsList, function(elem) {
                _this.add(elem);
            });
        };

        MediaItemsList.prototype.getRemote = function() {
            if (this.allMediaItemsLoaded || this.isLoadInProcess) { return false; }
            var _this = this;

            this.isLoadInProcess = true;

            return this.getRemoteRequest()
                .then(function(response) {
                    _this.addList(response.data);
                })
                .finally(function() {
                    _this.isLoadInProcess = false;
                });
        };

        MediaItemsList.prototype.getRemoteRequest = function() {
            if (this.type === 'photos') {
                return photosService.getByInstId(this.institutionId, {
                    offset: this.data.length,
                    limit: 9
                });
            } else {
                return videos.getByInstId(this.institutionId, {
                    offset: this.data.length,
                    limit: 9
                });
            }


        };

        return MediaItemsList;
    }
})();