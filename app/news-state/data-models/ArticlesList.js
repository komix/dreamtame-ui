(function() {
    'use strict';

    angular
        .module('app')
        .factory('ArticlesList', articlesList);

    articlesList.$inject = ['news', 'Article'];
    /* @ngInject */
    function articlesList(news, Article) {
        _(ArticlesList.prototype).extend(EventEmitter.prototype);

        function ArticlesList(params) {
            this.data = [];
            this.isLoadInProgress = false;
        }



        ArticlesList.prototype.add = function(article, unshift) {
            var newArticle = new Article(article);
            if (unshift) {
                this.data.unshift(newArticle);
            } else {
                this.data.push(newArticle);
            }
        };

        ArticlesList.prototype.addList = function(articlesList) {
            var _this = this;

            _.each(articlesList, function(elem) {
                _this.add(elem);
            });
        };


        ArticlesList.prototype.getRemote = function() {
            var _this = this;

            this.isLoadInProgress = true;
            return news.getAll().then(function(response) {
                _this.addList(response.data);
                _this.isLoadInProgress = false;
            });
        };

        ArticlesList.prototype.getArticleById = function(id) {
            return _.find(this.data, function(elem) {
                return elem.id === id;
            });
        };

        return ArticlesList;
    }
})();