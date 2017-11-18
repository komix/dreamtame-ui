(function(){
    angular.module('app')
        .factory('loadGoogleMaps', loadGoogleMaps);

    loadGoogleMaps.$inject = ['$window', '$q'];

    function loadGoogleMaps($window, $q) {
        var asyncUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB27S2BMpCF68hXnNnAhuSQItlHfjotyMQ&libraries=places,drawing&callback=',
            mapsDefer = $q.defer();

        $window.googleMapsInitialized = mapsDefer.resolve; // removed ()

        var asyncLoad = function(asyncUrl, callbackName) {
            var script = document.createElement('script');
            script.src = asyncUrl + callbackName;
            document.body.appendChild(script);
        };

        asyncLoad(asyncUrl, 'googleMapsInitialized');

        return {
            mapsInitialized: mapsDefer.promise
        };
    }


})();
