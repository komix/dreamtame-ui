'use strict';

// Declare app level module which depends on views, and components
angular
    .module('app', [
      'ui.router',
      'ui.router.state.events',
      'ui.bootstrap',
      'ngStorage',
      'ngResource',
      'ngCropper',
      'infinite-scroll',
      //'angular-google-analytics'
    ])

    //.config(['$urlRouterProvider', '$locationProvider', 'AnalyticsProvider',
    //  function($urlRouterProvider, $locationProvider, AnalyticsProvider) {
    //    //$locationProvider.html5Mode(true);
    //    $urlRouterProvider.otherwise("login");
    //    AnalyticsProvider.setAccount('UA-100601648-1');
    //  }])
    //.run(['Analytics', function(Analytics) { }]);

    .config(['$urlRouterProvider', '$locationProvider',
        function($urlRouterProvider, $locationProvider) {
            //$locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise("login");
            //AnalyticsProvider.setAccount('UA-100601648-1');
        }]);
    //.run(['Analytics', function(Analytics) { }]);



