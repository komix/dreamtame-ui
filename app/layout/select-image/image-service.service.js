(function () {
	'use strict';
	angular.module('app')
		.factory('imageService', imageService);


	imageService.$inject = ['$q', '$http', 'global', 'Cropper'];

	function imageService($q, $http, global, Cropper) {
		var apiUrl = global.apiUrl;

		var ORIG_W = 2000;
		var THUMB_W = 700;

		var service = {
			deployCroppedImage: deployCroppedImage,
			deployRawImage: deployRawImage,
			deployImageString: deployImageString
		};

		return service;

		function deployCroppedImage(img) {
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

		function deployRawImage(file, config, placeholder) {
			var defered = $q.defer();
			var origW = config && config.origW ? config.origW : ORIG_W;
			var thumbW = config && config.thumbW ? config.thumbW : THUMB_W;

			var images = [];

			scaleImages();

			return defered.promise;

			function scaleImages() {
				$q.all([scale(file, origW), scale(file, thumbW)]).then(function(results) {
					_.each(results, function(elem) {
						var fileReader = new FileReader();
						fileReader.onload = getBase64;
						fileReader.readAsDataURL(elem);
					});
				});
			}

			function getBase64(result) {
				images.push(result.currentTarget.result);

				if (images.length === 2) {
					deployImages(images);
				}
			}

			function deployImages(images) {
				$q.all([deployImageString(images[0]), deployImageString(images[1])])
					.then(function(results) {
						defered.resolve(formImageData([
							results[0].data,
							results[1].data
						]));
					});
			}

			function formImageData(images) {
				var imageData = {};
				var orig = images[0].width > images[1].width ? images[0] : images[1];
				var thumb = images[0].width > images[1].width ? images[1] : images[0];

				imageData.src = orig.src;
				imageData.msrc = thumb.src;
				imageData.w = orig.width;
				imageData.h = orig.height;

				if (placeholder) {
					imageData.sqr = placeholder;
				}

				return imageData;
			}

			function scale(blob, width) {
				return Cropper.scale(blob, {width: width});
			}
		}


		function deployImageString(imgString) {
			return $http.post(apiUrl + '/image-upload', {base64Image: imgString})
		}

	}
})();