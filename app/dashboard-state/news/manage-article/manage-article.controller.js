(function () {
    'use strict';
    angular
        .module('app')
        .controller('DashboardManageArticleController', DashboardManageArticleController);

    DashboardManageArticleController.$inject = ['$stateParams', 'Article'];

    function DashboardManageArticleController($stateParams, Article) {
        var vm = this;

        var articleId = $stateParams.id;

        var selImgConfig = {
            aspectRatio: 1,
            resizeTo: 700,
            editable: true,
            buttonUnder: true
        };

        vm.selImgConfig = selImgConfig;
        vm.submit = submit;

        activate();

        function activate() {
            if (articleId) {
                vm.isCreateState = false;
                vm.article = new Article({id: articleId});
                vm.actionName = 'Редагувати пост';
                vm.submitActionTitle = 'Зберегти';

                vm.article.getRemote().then(function() {
                    vm.image = { src: vm.article.imgUrl };
                });
            } else {
                vm.article = new Article();
                vm.isCreateState = true;
                vm.actionName = 'Додати пост';
                vm.submitActionTitle = 'Додати';
            }
        }

        function getRequest() {
            return vm.isCreateState ? vm.article.create() : vm.article.update();
        }

        function submit() {
            _.each(vm.form.$error.required, function(elem) {
                elem.$setDirty();
            });

            if (!vm.form.$valid) { return false; }

            if (!vm.image.src) { alert('Додай фото, безтолоч.'); return false;}

            vm.article.imgUrl = vm.image.src;

            getRequest().then(function(response) {
                console.log(response);
            })
        }

    }
})();

