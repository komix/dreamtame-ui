(function() {
    'use strict';

    angular
        .module('app')
        .factory('global', global);

    global.$inject = [];

    function global() {
    	var defer;
    	var service = {
            //apiUrl: 'http://bitman.dreamtame.com',
            apiUrl: 'http://localhost:8000',
    	};

    	return service;
    }

})();
