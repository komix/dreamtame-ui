(function() {
    'use strict';

    angular
        .module('app')
        .factory('global', global);

    global.$inject = [];

    function global() {
    	var service = {
            //apiUrl: 'http://localhost:8000',
            apiUrl: 'http://api.dreamtame.com',
            states: null
    	};

        function initStates() {

        }

    	return service;
    }

})();
