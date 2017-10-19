(function () {
    'use strict';

    angular
        .module('app')
        .controller('ArticleController', ArticleController);

    ArticleController.$inject = ['$stateParams', 'Article'];

    function ArticleController($stateParams, Article) {
        var vm = this;

        var articleId = $stateParams.id;

        vm.article = new Article({id: articleId});

        activate();

        function activate() {
            vm.article.getRemote().then(function() {
                vm.options = { article: vm.article };
            });
        }

    }

})();