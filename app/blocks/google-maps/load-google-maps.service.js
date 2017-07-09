(function(){
    angular.module('app')
        .factory('loadGoogleMaps', loadGoogleMaps);

    loadGoogleMaps.$inject = ['$window', '$q'];

    //function loadGoogleMaps($window, $q) {
    //    var deferred = $q.defer();
    //
    //    $window.initMap = initMapp;
    //    loadScript();
    //
    //    return deferred.promise;
    //
    //    function initMapp () {
    //        deferred.resolve();
    //    }
    //
    //    function loadScript() {
    //        console.log('loading');
    //        var script = document.createElement('script');
    //        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB27S2BMpCF68hXnNnAhuSQItlHfjotyMQ&callback=initMap&libraries=places';
    //        document.body.appendChild(script);
    //    }
    //}

    function loadGoogleMaps($window, $q) {
        var asyncUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB27S2BMpCF68hXnNnAhuSQItlHfjotyMQ&libraries=places&callback=',
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
    //
    //function mapsInitFactory($window, $q) {
    //    var asyncUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB27S2BMpCF68hXnNnAhuSQItlHfjotyMQ&libraries=places&callback=',
    //        mapsDefer = $q.defer();
    //
    //    $window.googleMapsInitialized = mapsDefer.resolve; // removed ()
    //
    //    var asyncLoad = function(asyncUrl, callbackName) {
    //        var script = document.createElement('script');
    //        script.src = asyncUrl + callbackName;
    //        document.body.appendChild(script);
    //    };
    //
    //    //Start loading google maps
    //    asyncLoad(asyncUrl, 'googleMapsInitialized');
    //
    //    //Usage: Initializer.mapsInitialized.then(callback)
    //    return {
    //        mapsInitialized: mapsDefer.promise
    //    };
    //}


})();
