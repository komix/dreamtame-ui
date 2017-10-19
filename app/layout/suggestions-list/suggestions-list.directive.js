(function () {
    'use strict';

    angular
        .module('app')
        .directive('suggestionsList', suggestionsList);

    suggestionsList.$inject = [];
    /* @ngInject */
    function suggestionsList() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: SuggestionsListController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'layout/suggestions-list/suggestions-list.view.html',
            scope: {
                item: '='
            }
        };

        return directive;
    }

    SuggestionsListController.$inject = ['SuggestionsList'];

    function SuggestionsListController(SuggestionsList) {
        var vm = this;

        vm.suggestions = new SuggestionsList();

        activate();

        function activate() {
            vm.suggestions.getRemote();
        }
    }
})();