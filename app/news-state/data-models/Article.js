(function() {
    'use strict';

    angular
        .module('app')
        .factory('Article', article);

    article.$inject = ['news'];
    /* @ngInject */
    function article(news) {
        _(Article.prototype).extend(EventEmitter.prototype);

        function Article(params) {
            this.id = null;
            this.title = '';
            this.author = '';
            this.snippet = '';
            this.text = '';
            this.imgUrl = null;
            this.text = '';

            this.init(params);
        }

        Article.prototype.init = function(params) {
            if (!params) { return false; }

            if (params.id) { this.id = params.id; }
            if (params.title) { this.title = params.title; }
            if (params.author) { this.author = params.author; }
            if (params.snippet) { this.snippet = params.snippet; }
            if (params.text) { this.text = params.text; }
            if (params.imgUrl) { this.imgUrl = params.imgUrl; }
        };

        Article.prototype.getCreatedAtFromNow = function() {
            return moment(this.createdAt).fromNow();
        };

        Article.prototype.getData = function() {
            var data = {
                title: this.title,
                snippet: this.snippet,
                text: this.text,
                imgUrl: this.imgUrl
            };

            if (this.id) {
                data.id = this.id;
            }

            return data;
        };

        Article.prototype.create = function() {
            return news.add(this.getData());
        };

        Article.prototype.update = function() {
            return news.update(this.getData());
        };

        Article.prototype.getRemote = function() {
            var _this = this;
            return news.get(this.id).then(function(response) {
                _this.init(response.data);
            });
        };

        return Article;
    }
})();