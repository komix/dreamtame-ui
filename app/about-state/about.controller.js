(function () {
    'use strict';

    angular
        .module('app')
        .controller('AboutController', AboutController);

    AboutController.$inject = ['$stateParams', 'categories'];

    function AboutController($stateParams, categories) {
        var vm = this;


        //activate();
        //
        //function activate() {
        //
        //}

    }

})();