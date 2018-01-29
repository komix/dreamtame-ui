(function () {
    'use strict';

    angular
        .module('app')
        .controller('ArticleController', ArticleController);

    ArticleController.$inject = ['$scope', '$stateParams', 'Article', 'metaTags'];

    function ArticleController($scope, $stateParams, Article, metaTags) {
        var vm = this;

        var articleId = $stateParams.id;

        vm.article = new Article({id: articleId});

        activate();

        function activate() {
            vm.article.getRemote().then(function() {
                vm.options = { article: vm.article };
                metaTags.setTitle(vm.article.title);
                metaTags.setDescription(vm.article.snippet);
            });

            $scope.$on('$destroy', function() {
                metaTags.reset();
            });
        }

    }

})();