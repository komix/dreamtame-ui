(function () {
	'use strict';
	angular.module('app')
		.factory('imageService', imageService);


	imageService.$inject = ['$q', '$http', 'global', 'Cropper'];

	function imageService($q, $http, global, Cropper) {
		var HORIZONTAL_O_WIDTH = 700;
		var defered;
		var apiUrl = global.apiUrl;

		var service = {
			resize: resize
		};

		return service;

		function deployImageString(imgString) {
			var deployDefer = $q.defer();

			$http.post(apiUrl + '/image-upload', {base64Image: imgString}).then(function(response) {
				deployDefer.resolve(response);
			});

			return deployDefer.promise;
		}

		function resize(file) {
			defered = $q.defer();
			getDataUrl(file);
			return defered.promise
		}


		function scale(blob) {
            return Cropper.scale(blob, {width: HORIZONTAL_O_WIDTH});
        }

		function getDataUrl(file) {
			var base64 = {
				imgUrl: '',
				thumbUrl: ''
			};

			scale(file).then(function(scaled) {
				var fr2 = new FileReader();
	            fr2.onload = getThumbBase64;
	            fr2.readAsDataURL(scaled);
			});

			function getThumbBase64(result) {
				base64.thumbUrl = result.currentTarget.result;

				var fr = new FileReader();
	            fr.onload = getImageBase64;
	            fr.readAsDataURL(file);
			}

			function getImageBase64(result) {
				base64.imgUrl = result.currentTarget.result;
				deployImageAndThumb(base64)
			}
		}


		function deployImageAndThumb(imageObj) {
			var packDefer = $q.defer();

			var responseObj = {};
			deployImageString(imageObj.imgUrl).then(function(response) {
				responseObj.imgUrl = response.data;
				deployImageString(imageObj.thumbUrl).then(function(responseThumb) {
					responseObj.thumbUrl = responseThumb.data;
					defered.resolve(responseObj);
				})
			});

			return packDefer.promise;
		}


		
	}
})();