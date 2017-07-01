(function () {
	'use strict';
	angular.module('app')
		.factory('imageService', imageService);


	imageService.$inject = ['$q', '$http', 'global', 'Cropper'];

	function imageService($q, $http, global, Cropper) {
		var defered;
		var apiUrl = global.apiUrl;

		var service = {
			deployImage: deployImage
		};

		return service;

		function deployImage(img) {
			var defered = $q.defer();

			$q.all([deployImageString(img.src), deployImageString(img.msrc)])
				.then(function(responses) {
					if (!responses[0] || !responses[0].data || !responses[1] || !responses[1].data) {
						defered.reject(false);
					}
					defered.resolve({
						src: responses[0].data.src,
						msrc: responses[1].data.src,
						w: responses[0].data.width,
						h: responses[0].data.height
					})
				});

			return defered.promise;
		}


		function deployImageString(imgString) {
			return $http.post(apiUrl + '/image-upload', {base64Image: imgString})
		}

	}
})();