(function() {
    'use strict';

    angular
        .module('app')
        .factory('helper', helper);

    helper.$inject = [];

    function helper() {
        var service = {
            updateArrayByReference: updateArrayByReference,
            getHash: getHash,
            getHierarchy: getHierarchy
        };

        return service;

        function updateArrayByReference(source, destination) {
            source.length = 0;

            _(destination).each(function(value) {
                source.push(value);
            });
        }

        function getHash(tree, keyToMap) {
            var hash = {};

            if (_.isArray(tree)) {
                writeHash(tree);
            } else {
                hash[tree[keyToMap]] = tree;
                writeHash(tree.children);
            }

            function writeHash(items) {
                _.each(items, function(elem) {
                    hash[elem[keyToMap]] = elem;
                    if (elem.children) {
                        writeHash(elem.children);
                    }
                });
            }

            return hash;
        }

        function getHierarchy(hash, preselected) {
            var hierarchy = [];

            hierarchy.push(preselected);
            pushParent(preselected);

            function pushParent(category) {
                var parent = hash[category.parent];
                if (parent) {
                    hierarchy.unshift(parent);
                    pushParent(parent);
                }
            }

            return hierarchy;
        }
    }
})();




