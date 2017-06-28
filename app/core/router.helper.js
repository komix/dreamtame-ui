(function() {
    'use strict';

    angular
        .module('app')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', 'users'];
    /* @ngInject */
    function appRun($rootScope, $state, users) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if (toState.needAuth) {
                if (!user.currentToken) {
                    event.preventDefault();
                    $state.go('login');
                }
            }
        });
    }
})();
