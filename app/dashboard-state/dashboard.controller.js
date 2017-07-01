(function () {
	'use strict';
	angular
		.module('app')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['users'];

	function DashboardController(users) {
		var vm = this;

		vm.logOut = logOut;

		function logOut() {
			users.logout();
		}

	}
})();


