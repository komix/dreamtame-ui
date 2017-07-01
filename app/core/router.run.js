(function() {
    'use strict';

    angular
        .module('app')
        .run(appRun);

    appRun.$inject = ['$rootScope', 'routerHelper', 'users'];
    /* @ngInject */
    function appRun($rootScope, routerHelper, users) {
        users.authorize();

        $rootScope.$on('$stateChangeStart', routerHelper.onStateChangeStart);

        //$rootScope.$on('$stateChangeSuccess', routerHelper.onStateChangeSuccess);
        //$rootScope.$on('$stateChangeError', routerHelper.onStateChangeError);

        //$rootScope.$on('$stateChangeStart', function(event, toState) {
        //    if (toState.permissions) {
        //        console.log(users.current);
        //        if (!users.current) {
        //            event.preventDefault();
        //            $state.go('login');
        //        }
        //    }
        //});
    }
})();
