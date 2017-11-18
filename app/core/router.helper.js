(function() {
    'use strict';

    angular
        .module('app')
        .factory('routerHelper', routerHelper);

    routerHelper.$inject = ['$state', 'users'];

    function routerHelper($state, users) {

        var service = {
            getState: getState,
            getStates: getStates,
            isStateAvailable: isStateAvailable,
            onStateChangeStart: onStateChangeStart,
            goToDefaultState: goToDefaultState,
            goToLoginState: goToLoginState
        };

        return service;

        function getStates() { return $state.get(); }

        function getState(stateName) {
            if (!stateName) { return false; }
            return _.find(getStates(), function (elem) { return elem.name === stateName });
        }

        function isStateAvailable(stateName) {
            var state = service.getState(stateName);
            if (!state) { return false; }

            var stateIsAvailable = true;

            if (state.permissions) {
                if (state.permissions.only) {
                    stateIsAvailable = users.isPermissionAvailable(state.permissions.only);

                    if (state.permissions.only === 'abstractState') {
                        stateIsAvailable = isStateAvailable(state.redirectTo[0]);
                    }
                }
                if (state.permissions.except) {
                    stateIsAvailable = !users.isPermissionAvailable(state.permissions.except);
                }
            }

            return stateIsAvailable;
        }

        function onStateChangeStart(event, toState) {
            if (toState.permissions) {
                if (toState.permissions.only) {
                    if (toState.permissions.only === 'abstractState') {
                        event.preventDefault();
                        return service.goToDefaultState(toState.redirectTo);
                    }

                    if (!users.isPermissionAvailable(toState.permissions.only)) {
                        event.preventDefault();
                        $state.isResolveInProcess = false;

                        if (toState.permissions.only === 'isAuthorized') {
                            return service.goToLoginState();
                        } else {
                            return service.goToDefaultState(toState.redirectTo);
                        }
                    }
                } else if (toState.permissions.except){
                    if (users.isPermissionAvailable(toState.permissions.except)) {
                        event.preventDefault();
                        return service.goToDefaultState(toState.redirectTo);
                    }
                }
            }
        }

        function goToDefaultState(redirectTo) {
            var accessibleRoute;
            if (redirectTo) {
                accessibleRoute = _.find(redirectTo, function(elem) {
                    return service.isStateAvailable(elem);
                })
            }
            $state.go(accessibleRoute || 'home');
        }

        function goToLoginState() {
            $state.go('login.signin');
        }


    }
})();