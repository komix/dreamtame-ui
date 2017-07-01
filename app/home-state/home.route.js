(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url:'/',
                    templateUrl: 'home-state/home.view.html',
                    controller: 'HomeController',
                    controllerAs: 'vm',
                    needAuth: true
                })
        }])
})();