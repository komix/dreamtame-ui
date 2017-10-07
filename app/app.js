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
      'youtube-embed',
      'summernote',
      'angular-preload-image'
      //'angular-google-analytics'
    ])

    //.config(['$urlRouterProvider', '$locationProvider', 'AnalyticsProvider',
    //  function($urlRouterProvider, $locationProvider, AnalyticsProvider) {
    //    //$locationProvider.html5Mode(true);
    //    $urlRouterProvider.otherwise("login");
    //    AnalyticsProvider.setAccount('UA-100601648-1');
    //  }])
    //.run(['Analytics', function(Analytics) { }]);

    .config(['$urlRouterProvider', '$locationProvider', '$compileProvider', '$qProvider',
        function($urlRouterProvider, $locationProvider, $compileProvider, $qProvider) {
            //$locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise("login");
            $compileProvider.preAssignBindingsEnabled(true);
            //$qProvider.errorOnUnhandledRejections(false);
            //AnalyticsProvider.setAccount('UA-100601648-1');
        }]);
    //.run(['Analytics', function(Analytics) { }]);



