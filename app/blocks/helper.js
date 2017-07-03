(function() {
    'use strict';

    angular
        .module('app')
        .factory('helper', helper);

    helper.$inject = [];

    function helper() {
        var service = {
            updateArrayByReference: updateArrayByReference,
        };

        return service;

        function updateArrayByReference(source, destination) {
            source.length = 0;

            _(destination).each(function(value) {
                source.push(value);
            });
        }
    }
})();




