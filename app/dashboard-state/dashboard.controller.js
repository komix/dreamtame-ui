(function () {
	'use strict';
	angular
		.module('app')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['user'];

	function DashboardController(user) {
		var vm = this;

		vm.logOut = logOut;

		function logOut() {
			user.logout();
		}

	}
})();


