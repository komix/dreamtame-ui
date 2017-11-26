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
      'angular-preload-image',
      'angular-google-analytics'
    ])

    .config(['$urlRouterProvider', '$locationProvider', '$compileProvider', 'AnalyticsProvider',
        function($urlRouterProvider, $locationProvider, $compileProvider, AnalyticsProvider) {
            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise("login");
            $compileProvider.preAssignBindingsEnabled(true);

            AnalyticsProvider.setAccount('UA-109656575-1');
        }])

    .run(['Analytics', function(Analytics) { }]);



