(function () {
    'use strict';

    angular
        .module('app')
        .directive('suggestion', suggestion);

    suggestion.$inject = [];
    /* @ngInject */
    function suggestion() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: SuggestionController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'layout/suggestion/suggestion.view.html',
            scope: {
                item: '='
            }
        };

        return directive;
    }

    SuggestionController.$inject = [];

    function SuggestionController() {
        var vm = this;


        activate();

        function activate() {

        }
    }
})();