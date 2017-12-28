(function () {
    'use strict';
    angular
        .module('app')
        .controller('ServicesController', ServicesController);

    ServicesController.$inject = ['$stateParams'];

    function ServicesController($stateParams) {
        var vm = this;

        activate();

        function activate() {

        }



    }

})();

