(function () {
    'use strict';
    angular
        .module('app')
        .controller('InstitutionsController', InstitutionsController);

    InstitutionsController.$inject = ['$state', '$stateParams', 'routerHelper'];

    function InstitutionsController($state, $stateParams, routerHelper) {
        var vm = this;

        vm.activeCatId = $stateParams.id;
        vm.goToCreateState = goToCreateState;

        activate();

        function activate() {

        }

        function goToCreateState() {
            if (routerHelper.isStateAvailable('manage-inst')) {
                return $state.go('manage-inst');
            } else {
                return $state.go('login.signup');
            }
        }
    }

})();

