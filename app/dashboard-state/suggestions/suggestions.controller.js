(function () {
    'use strict';
    angular
        .module('app')
        .controller('DashboardSuggestionsController', DashboardSuggestionsController);

    DashboardSuggestionsController.$inject = ['SuggestionsList'];

    function DashboardSuggestionsController(SuggestionsList) {
        var vm = this;

        vm.suggestions = new SuggestionsList();

        activate();

        function activate() {
            vm.suggestions.getRemote();
        }
    }
})();
