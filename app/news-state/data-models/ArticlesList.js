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
            this.isLoadInProcess = false;
            this.allArticlesLoaded = false;
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

            if (!articlesList.length) {
                this.allArticlesLoaded = true;
            }

            _.each(articlesList, function(elem) {
                _this.add(elem);
            });
        };


        ArticlesList.prototype.getRemote = function() {
            if (this.allArticlesLoaded || this.isLoadInProcess) { return false; }
            var _this = this;

            this.isLoadInProcess = true;
            return news.getAll({
                    offset: this.data.length,
                    limit: 15
                })
                .then(function(response) {
                    _this.addList(response.data);
                })
                .finally(function() {
                    _this.isLoadInProcess = false;
                });
        };

        return ArticlesList;
    }
})();