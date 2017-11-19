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
            getHierarchy: getHierarchy,
            applyDstOffset: applyDstOffset
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
                if (!category) { return false; }

                var parent = hash[category.parent];
                if (parent) {
                    hierarchy.unshift(parent);
                    pushParent(parent);
                }
            }

            return hierarchy;
        }

        function applyDstOffset(dateObj) {
            if (!_.isDate(dateObj)) {
                var dateUtc = moment.utc(dateObj);
                dateObj = moment(dateUtc).local();

                if (isDstActive(dateObj)) {
                    dateObj.add(1, 'hours');
                }
            }

            return dateObj;
        }

        function getDstOffset() {
            var newDate = new Date();
            var jan = new Date(newDate.getFullYear(), 0, 1).getTimezoneOffset();
            var jul = new Date(newDate.getFullYear(), 6, 1).getTimezoneOffset();

            return Math.max(jan, jul);
        }

        function isDstActive(dateObj) {
            var dateItem = moment(dateObj).toDate();
            return dateItem.getTimezoneOffset() < getDstOffset();
        }
    }
})();




