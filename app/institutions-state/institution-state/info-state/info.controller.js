(function () {
    'use strict';
    angular
        .module('app')
        .controller('InstitutionInfoController', InstitutionInfoController);

    InstitutionInfoController.$inject = ['$stateParams'];

    function InstitutionInfoController($stateParams) {
        var vm = this;

        var instId = $stateParams.id;

        console.log(instId);


    }

})();

