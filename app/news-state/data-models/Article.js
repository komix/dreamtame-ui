(function() {
    'use strict';

    angular
        .module('app')
        .factory('Article', article);

    article.$inject = ['news', 'DateTimePicker', 'helper'];
    /* @ngInject */
    function article(news, DateTimePicker, helper) {
        _(Article.prototype).extend(EventEmitter.prototype);

        function Article(params) {
            this.id = null;
            this.title = '';
            this.author = '';
            this.snippet = '';
            this.text = '';
            this.imgUrl = null;
            this.text = '';
            this.isPublished = false;
            this.createdAt = new DateTimePicker({
                date: new Date(),
                time: new Date()
            });

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
            if (params.isPublished) { this.isPublished = params.isPublished; }
            if (params.createdAt) {
                var dstTime = helper.applyDstOffset(params.createdAt);

                this.createdAt = new DateTimePicker({
                    date: new Date(dstTime),
                    time: new Date(dstTime)
                });
            }
        };

        Article.prototype.getCreatedAtFromNow = function() {
            return moment(this.createdAt).fromNow();
        };

        Article.prototype.getData = function() {
            var data = {
                title: this.title,
                snippet: this.snippet,
                text: this.text,
                imgUrl: this.imgUrl,
                createdAt: this.getTime()
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
            return news.get(this.id)
                .catch(function() {
                    console.log('Error while getting article.')
                })
                .then(function(response) {
                    if (!response) { return false; }
                    _this.init(response.data);
                });
        };

        Article.prototype.getTime = function() {
            return this.createdAt.getDateTime();
        };

        Article.prototype.getCreatedAtFormatted = function() {
            return moment(this.getTime()).format('DD.MM.YYYY');
        };

        Article.prototype.setPublished = function(value) {
            var _this = this;

            return news.publish(this.id, value)
                .catch(function(err) {
                    console.warn(err);
                })
                .then(function () {
                    _this.isPublished = value;
                });
        };

        return Article;
    }
})();