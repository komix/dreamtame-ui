(function () {
    'use strict';

    angular
        .module('app')
        .directive('articleBlock', articleBlock);

    articleBlock.$inject = [];
    /* @ngInject */
    function articleBlock() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: ArticleBlockController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'news-state/article-block/article-block.html',
            scope: {
                article: '='
            }
        };

        return directive;
    }

    ArticleBlockController.$inject = [];

    function ArticleBlockController() {
        var vm = this;

        activate();

        function activate() {

        }

    }
})();