(function () {
    'use strict';

    angular
        .module('app')
        .controller('confirmModalController', confirmModalController);


    confirmModalController.$inject = ['message', 'confirm'];
   
    function confirmModalController(message, confirm) {
        var vm = this;
        vm.message = message;
        vm.respond = respond;

        function respond(response) {
           confirm.resolve(response);
        };
    }
})();
