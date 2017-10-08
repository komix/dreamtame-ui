(function () {
    'use strict';

    angular
        .module('app')
        .directive('comments', comments);

    comments.$inject = [];
    /* @ngInject */
    function comments() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: CommentsController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'layout/comments/comments.html',
            scope: {
                options: '='
            }
        };

        return directive;
    }

    CommentsController.$inject = ['CommentsList', 'Comment', 'users'];

    function CommentsController(CommentsList, Comment, users) {
        var vm = this;

        vm.users = users;
        vm.comments = new CommentsList(vm.options);
        vm.commentData = {};
        vm.activeCommentId = null;

        vm.getAuthorFullName = getAuthorFullName;
        vm.submit = submit;
        vm.submitAnswer = submitAnswer;
        vm.isAnswerFormVisible = isAnswerFormVisible;
        vm.setActiveCommentId = setActiveCommentId;
        vm.loadMoreComments = loadMoreComments;

        activate();

        function activate() {
            vm.comments.getRemote();
        }

        function getAuthorFullName(author) {
            return author.firstName + " " + author.lastName;
        }

        function submit() {
            _.each(vm.form.$error.required, function(elem) {
                elem.$setDirty();
            });

            if (!vm.form.$valid) { return false; }

            vm.comments.addRemotely({
                institution: vm.options.institution,
                text: vm.commentData.text,
                author: users.current,
                createdAt: new Date()
            }).then(function() {
                vm.commentData.text = '';
                vm.form.$setPristine();
            })
        }

        function submitAnswer(commentId) {
            _.each(vm.answerform.$error.required, function(elem) {
                elem.$setDirty();
            });

            if (!vm.answerform.$valid) { return false; }

            vm.comments.addRemotely({
                institution: vm.options.institution,
                text: vm.commentAnswer.text,
                author: users.current,
                createdAt: new Date(),
                commentId: commentId
            }).then(function() {
                vm.commentAnswer.text = '';
                vm.answerform.$setPristine();
            })
        }

        function isAnswerFormVisible(id) {
            return vm.activeCommentId === id;
        }

        function setActiveCommentId(id) {
            vm.activeCommentId = id;
        }

        function loadMoreComments() {
            vm.comments.getRemote();
        }
    }
})();