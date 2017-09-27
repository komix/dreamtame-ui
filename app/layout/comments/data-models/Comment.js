(function() {
    'use strict';

    angular
        .module('app')
        .factory('Comment', comment);

    comment.$inject = ['commentsService'];
    /* @ngInject */
    function comment(commentsService) {
        _(Comment.prototype).extend(EventEmitter.prototype);

        function Comment(params) {
            Comment.validate(params);
            this.id = chance.guid();
            this.institution = null;
            this.article = null;
            this.author = null;
            this.createdAt = null;
            this.text = '';
            this.commentId = null;
            this.answers = [];

            this.init(params);
        }

        Comment.validate = function(params) {
            if (!params || !params.text || !params.institution) {
                console.log('Comment: Incorrect arguments!');
            }
        };

        Comment.prototype.init = function(params) {
            if (params.id) { this.id = params.id; }
            if (params.institution) { this.institution = params.institution; }
            if (params.article) { this.article = params.article; }
            if (params.author) { this.author = params.author; }
            if (params.createdAt) { this.createdAt = params.createdAt; }
            if (params.commentId) { this.commentId = params.commentId; }
            if (params.text) { this.text = params.text; }

            if (params.answers && params.answers.length) {
                this.addAnswersList(params.answers);
            }
        };

        Comment.prototype.getCreatedAtFromNow = function() {
            return moment(this.createdAt).fromNow();
        };

        Comment.prototype.getData = function() {
            var commentData = {
                text: this.text,
                institutionId: this.institution.id
            };

            if (this.commentId) {
                commentData.commentId = this.commentId;
            }

            return commentData;
        };

        Comment.prototype.create = function() {
            return commentsService.add(this.getData());
        };

        Comment.prototype.addAnswer = function(answer) {
            this.answers.push(answer);
        };

        Comment.prototype.addAnswersList = function(answersList) {
            var _this = this;
            _.each(answersList, function(elem) {
                var answer = new Comment(elem);
                _this.addAnswer(answer);
            })
        };

        return Comment;
    }
})();