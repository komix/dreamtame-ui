(function() {
    'use strict';

    angular
        .module('app')
        .factory('CommentsList', commentsList);

    commentsList.$inject = ['commentsService', 'Comment'];
    /* @ngInject */
    function commentsList(commentsService, Comment) {
        _(CommentsList.prototype).extend(EventEmitter.prototype);

        function CommentsList(params) {
            CommentsList.validate(params);
            
            this.institution = null;
            this.article = null;
            this.author = null;
            this.data = [];
            this.isLoadInProcess = false;
            this.allCommentsLoaded = false;

            this.init(params);
        }

        CommentsList.validate = function(params) {
            if (!params || (!params.institution && !params.article)) {
                console.log('CommentsList: Incorrect arguments!');
            }
        };

        CommentsList.prototype.init = function(params) {
            if (params.institution) { this.institution = params.institution; }
            if (params.article) { this.article = params.article; }
            if (params.author) { this.author = params.author; }
        };

        CommentsList.prototype.add = function(comment, unshift) {
            var newComment = new Comment(comment);
            if (unshift) {
                this.data.unshift(newComment);
            } else {
                this.data.push(newComment);
            }
        };

        CommentsList.prototype.addAnswer = function(commentId, answer) {
            var originalComment = this.getCommentById(commentId);

            originalComment.addAnswer(answer);
        };

        CommentsList.prototype.addList = function(commentsList) {
            var _this = this;

            if (!commentsList.length) {
                this.allCommentsLoaded = true;
            }

            _.each(commentsList, function(elem) {
                _this.add(elem);
            });
        };

        CommentsList.prototype.getRemote = function() {
            if (this.allCommentsLoaded || this.isLoadInProcess) { return false; }
            var _this = this;

            this.isLoadInProcess = true;
            return this.getRemoteRequest()
                .then(function(response) {
                    _this.addList(response.data);
                })
                .finally(function() {
                    _this.isLoadInProcess = false;
                });
        };

        CommentsList.prototype.getRemoteRequest = function() {
            if (this.user) {
                return commentsService.getCommentsByUserId(this.user.id);
            }

            if (this.institution) {
                return commentsService.getCommentsByInstitutionId(this.institution.id, {
                    offset: this.data.length,
                    limit: 10
                });
            }

            if (this.article) {
                return commentsService.getCommentsByArticleId(this.article.id);
            }
        };

        CommentsList.prototype.addRemotely = function(options) {
            var _this = this;
            var newComment = new Comment(options);

            return newComment.create().then(function(response) {
                newComment.id = response.data.id;

                if (newComment.commentId) {
                    _this.addAnswer(newComment.commentId, newComment);
                    return false;
                }

                _this.add(newComment, true);
            });
        };

        CommentsList.prototype.getCommentById = function(id) {
            return _.find(this.data, function(elem) {
               return elem.id === id;
            });
        };

        return CommentsList;
    }
})();