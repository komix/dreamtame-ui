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
      'angular-google-analytics',
      '720kb.socialshare'
    ])

    .config(['$urlRouterProvider', '$locationProvider', '$compileProvider', 'AnalyticsProvider',
        function($urlRouterProvider, $locationProvider, $compileProvider, AnalyticsProvider) {
            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');
            $compileProvider.preAssignBindingsEnabled(true);
            AnalyticsProvider.setAccount('UA-109656575-1');
        }])

    .run(['Analytics', function(Analytics) { }])
    .run(['$rootScope', '$window', 'users', function($rootScope, $window, users) {
        (function(d){
            // load the Facebook javascript SDK

            var js,
                id = 'facebook-jssdk',
                ref = d.getElementsByTagName('script')[0];

            if (d.getElementById(id)) {
                return;
            }

            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";

            ref.parentNode.insertBefore(js, ref);

        }(document));
    }]);



