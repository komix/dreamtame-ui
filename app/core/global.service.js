(function() {
    'use strict';

    angular
        .module('app')
        .factory('global', global);

    global.$inject = [];

    function global() {
    	var service = {
            //apiUrl: 'http://bitman.dreamtame.com',
            apiUrl: 'http://localhost:8000',
            states: null
    	};

        function initStates() {

        }

    	return service;
    }

})();
