(function() {
    'use strict';

    angular
        .module('app')
        .factory('Suggestion', suggestion);

    suggestion.$inject = ['suggestions'];
    /* @ngInject */
    function suggestion(suggestions) {
        _(Suggestion.prototype).extend(EventEmitter.prototype);

        function Suggestion(params) {
            this.id = null;
            this.name = '';
            this.url = null;
            this.imgUrl = null;
            this.isActive = false;

            this.init(params);
        }

        Suggestion.prototype.init = function(params) {
            if (!params) { return false; }

            if (params.id) { this.id = params.id; }
            if (params.name) { this.name = params.name; }
            if (params.url) { this.url = params.url; }
            if (params.imgUrl) { this.imgUrl = params.imgUrl; }
            if (params.isActive) { this.isActive = params.isActive; }
        };
        

        Suggestion.prototype.getData = function() {
            var data = {
                name: this.name,
                url: this.url,
                imgUrl: this.imgUrl,
                isActive: this.isActive
                
            };

            if (this.id) {
                data.id = this.id;
            }

            return data;
        };

        Suggestion.prototype.create = function() {
            return suggestions.add(this.getData());
        };

        Suggestion.prototype.update = function() {
            return suggestions.update(this.getData());
        };

        Suggestion.prototype.getRemote = function() {
            var _this = this;
            return suggestions.get(this.id).then(function(response) {
                _this.init(response.data);
            });
        };
        

        return Suggestion;
    }
})();