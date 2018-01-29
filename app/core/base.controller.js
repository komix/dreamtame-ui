(function () {
    'use strict';

    angular
        .module('app')
        .controller('BaseController', BaseController);

    BaseController.$inject = ['$state', 'users', '$rootScope', 'metaTags'];
    /* @ngInject */
    function BaseController($state, users, $rootScope, metaTags) {
        var vm = this;

        vm.users = users;
        vm.states = [];
        vm.metaTags = metaTags;

        vm.isActiveStateWide = isActiveStateWide;
        //vm.isActiveStateFullHeight = isActiveStateFullHeight;

        activate();

        function activate() {
            $rootScope.$on('token-invalid', function(){
                users.logout();
            });
        }



        function isActiveStateWide() {
            var wideStates = [
                'home',
                'about',
                'login',
                'login.signin',
                'login.signup',
                'confirm-email',
                'forgot-password',
                'restore-password',
                'services'
            ];

            return _.indexOf(wideStates, $state.current.name) !== -1;
        }

        //function isActiveStateFullHeight() {
        //    var highStates = [
        //        'home',
        //        'about',
        //        'login',
        //        'login.signin',
        //        'login.signup',
        //        'confirm-email',
        //        'forgot-password',
        //        'restore-password',
        //        'search',
        //        'search.default-state',
        //        'institutions.category',
        //        'institutions.institution.videos',
        //        'institutions.institution.photos',
        //        'institutions.institution.info',
        //    ];
        //
        //    return _.indexOf(highStates, $state.current.name) !== -1;
        //}


    }
})();

