(function() {
    'use strict';

    angular
        .module('app')
        .factory('LocationsList', locationsList);

    locationsList.$inject = ['locations', 'Location'];
    /* @ngInject */
    function locationsList(locations, Location) {
        _(LocationsList.prototype).extend(EventEmitter.prototype);

        function LocationsList() {
            this.data = [];
            this.isLoadInProcess = false;
        }



        LocationsList.prototype.add = function(location, unshift) {
            var newLocation = new Location(location);
            if (unshift) {
                this.data.unshift(newLocation);
            } else {
                this.data.push(newLocation);
            }
        };

        LocationsList.prototype.addList = function(locationsList) {
            var _this = this;

            _.each(locationsList, function(elem) {
                _this.add(elem);
            });
        };


        LocationsList.prototype.getRemote = function() {
            var _this = this;

            this.isLoadInProcess = true;
            return locations.getAll()
                .then(function(response) {
                    _this.addList(response.data);
                })
                .finally(function() {
                    _this.isLoadInProcess = false;
                });
        };


        return LocationsList;
    }
})();