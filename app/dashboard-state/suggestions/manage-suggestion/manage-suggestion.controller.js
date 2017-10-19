(function () {
    'use strict';
    angular
        .module('app')
        .controller('DashboardManageSuggestionController', DashboardManageSuggestionController);

    DashboardManageSuggestionController.$inject = ['$stateParams', 'Suggestion'];

    function DashboardManageSuggestionController($stateParams, Suggestion) {
        var vm = this;

        var suggestionId = $stateParams.id;

        var selImgConfig = {
            aspectRatio: 16/10,
            resizeTo: 700,
            editable: true,
            buttonUnder: true
        };

        vm.selImgConfig = selImgConfig;
        vm.submit = submit;

        activate();

        function activate() {
            if (suggestionId) {
                vm.isCreateState = false;
                vm.suggestion = new Suggestion({id: suggestionId});
                vm.actionName = 'Редагувати додаток';
                vm.submitActionTitle = 'Зберегти';

                vm.suggestion.getRemote().then(function() {
                    vm.image = { src: vm.suggestion.imgUrl };
                });
            } else {
                vm.suggestion = new Suggestion();
                vm.isCreateState = true;
                vm.actionName = 'Створити додаток';
                vm.submitActionTitle = 'Додати';
            }
        }

        function getRequest() {
            return vm.isCreateState ? vm.suggestion.create() : vm.suggestion.update();
        }

        function submit() {
            _.each(vm.form.$error.required, function(elem) {
                elem.$setDirty();
            });

            if (!vm.form.$valid) { return false; }

            if (!vm.image.src) { alert('Додай фото, безтолоч.'); return false;}

            vm.suggestion.imgUrl = vm.image.src;

            getRequest().then(function(response) {
                console.log(response);
            })
        }

    }
})();

