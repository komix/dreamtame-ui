(function () {
    'use strict';

    angular
        .module('app')
        .controller('ArticleController', ArticleController);

    ArticleController.$inject = ['$scope', '$stateParams', 'Article', 'metaTags', 'users'];

    function ArticleController($scope, $stateParams, Article, metaTags, users) {
        var vm = this;

        var articleId = $stateParams.id;

        vm.article = new Article({id: articleId});

        vm.isAdmin = isAdmin;
        vm.getArticleUrl = getArticleUrl;
        vm.getArticleHashtags = getArticleHashtags;

        activate();

        function activate() {
            vm.article.getRemote().then(function() {
                vm.options = { article: vm.article };
                metaTags.setTitle(vm.article.title);
                metaTags.setDescription(vm.article.snippet);
                metaTags.setOg({
                    image: vm.article.imgUrl,
                    url: vm.getArticleUrl()
                })
            });

            $scope.$on('$destroy', function() {
                metaTags.reset();
            });
        }

        function isAdmin() {
            if (!users.current) { return false; }

            return  users.current.role === 'admin' || users.current.role === 'superman';
        }

        function getArticleUrl() {
            var baseUrl = 'http://dreamtame.com/news/article/';
            return baseUrl + articleId
        }

        function getArticleHashtags() {
            return 'dreamtame';
        }

    }

})();