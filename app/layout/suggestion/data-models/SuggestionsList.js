(function() {
    'use strict';

    angular
        .module('app')
        .factory('SuggestionsList', uggestionsList);

    uggestionsList.$inject = ['suggestions', 'Suggestion'];
    /* @ngInject */
    function uggestionsList(suggestions, Suggestion) {
        _(SuggestionsList.prototype).extend(EventEmitter.prototype);

        function SuggestionsList(params) {
            this.data = [];
            this.isLoadInProcess = false;
        }

        SuggestionsList.prototype.add = function(suggestion, unshift) {
            var newSuggestion = new Suggestion(suggestion);
            if (unshift) {
                this.data.unshift(newSuggestion);
            } else {
                this.data.push(newSuggestion);
            }
        };

        SuggestionsList.prototype.addList = function(suggestionsList) {
            var _this = this;

            _.each(suggestionsList, function(elem) {
                _this.add(elem);
            });
        };


        SuggestionsList.prototype.getRemote = function() {
            var _this = this;

            this.isLoadInProcess = true;
            return suggestions.getAll().then(function(response) {
                _this.addList(response.data);
                _this.isLoadInProcess = false;
            });
        };

        SuggestionsList.prototype.getSuggestionById = function(id) {
            return _.find(this.data, function(elem) {
                return elem.id === id;
            });
        };

        return SuggestionsList;
    }
})();