(function () {
    'use strict';

    angular
        .module('app')
        .controller('WorkingHoursModalController', WorkingHoursModalController);

    WorkingHoursModalController.$inject = ['$rootScope', 'workingHours', '$uibModalStack', '$stateParams'];

    function WorkingHoursModalController($rootScope, workingHours, $uibModalStack, $stateParams) {
        var vm = this;

        vm.workingHours = workingHours;


        activate();

        function activate() {

        }
    }

})();