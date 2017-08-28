(function() {
    'use strict';

    angular
        .module('app')
        .factory('workingDays', workingDays);

    workingDays.$inject = ['$q', '$http', 'global'];
    /* @ngInject */
    function workingDays($q, $http, global) {

        var apiUrl = global.apiUrl;

        var daysOfWeek = [
            {
                dayName: 'понеділок',
                dayNumber: 0
            },
            {
                dayName: 'вівторок',
                dayNumber: 1
            },
            {
                dayName: 'середа',
                dayNumber: 2
            },
            {
                dayName: 'четвер',
                dayNumber: 3
            }, {
                dayName: 'п\'ятниця',
                dayNumber: 4
            },
            {
                dayName: 'субота',
                dayNumber: 5
            },
            {
                dayName: 'неділя',
                dayNumber: 6
            }
        ];

        var service = {
            daysOfWeek: daysOfWeek,
            add: add,
            get: get,
            update: update,
            remove: remove,
            getDayTitle: getDayTitle,
            getTimeFormatted: getTimeFormatted
        };

        return service;

        function add(workingDays) {
            var defered = $q.defer();
            $http.post(apiUrl +  '/api/working-hours', workingDays).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function get(instId){
            var defered = $q.defer();
            $http.get(apiUrl +  '/working-hours/institution/' + instId).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function update(workingDays) {
            var defered = $q.defer();
            $http.put(apiUrl +  '/api/working-hours/' + workingDays.id, workingDays).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function remove(id) {
            var defered = $q.defer();
            $http.delete(apiUrl +  '/api/working-hours/' + id).then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        }

        function getDayTitle(dayNumber) {
            var day = service.daysOfWeek[dayNumber];
            return day.dayName;
        }

        function getTimeFormatted(dateObj) {
            if (!_.isDate(dateObj)) {
                var dateUtc = moment.utc(dateObj);
                dateObj = moment(dateUtc).local();

                if (isDstActive(dateObj)) {
                    dateObj.add(1, 'hours');
                }
            }

            return moment(dateObj).format("HH:mm");
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