(function() {
    'use strict';

    angular
        .module('app')
        .factory('metaTags', metaTags);

    metaTags.$inject = [];
    /* @ngInject */
    function metaTags() {

        var DEFAULT_TITLE = 'Dreamtame';
        var DEFAULT_DESCRIPTION = 'Тут ви знайдете інформацію про спортивні секції Львова. Dreamtame - це не просто ' +
            'черговий каталог спортивних закладів нашого міста. Ми дбайливо підходимо до наповнення нашого ресурсу ' +
            'фотографії та відеозаписи з тренувань допоможуть обрати секцію, що підходить саме Вам чи Вашій дитині!'

        var service = {
            title: DEFAULT_TITLE,
            description: DEFAULT_DESCRIPTION,
            setTitle: setTitle,
            setDescription: setDescription,
            reset: reset
        };

        function setTitle(title) {
            service.title = title;
        }

        function setDescription(description) {
            service.description = description;
        }

        function reset() {
            service.setTitle(DEFAULT_TITLE);
            service.setDescription(DEFAULT_DESCRIPTION);
        }

        return service;



    }
})();