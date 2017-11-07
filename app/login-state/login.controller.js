(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state'];

    function LoginController($state) {
        var vm = this;

        vm.isStateActive = isStateActive;


        function isStateActive(state) {
            return $state.current.name === state;
        }

    }

})();