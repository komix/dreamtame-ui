(function() {
    'use strict';

    angular
        .module('app')
        .directive('footer', footer);

    footer.$inject = [];
    /* @ngInject */
    function footer() {
        var directive = {
            bindToController: true,
            controller: FooterController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'layout/footer/footer.view.html',
            scope: {}
        };

        return directive;
    }

    FooterController.$inject = [];
    /* @ngInject */
    function FooterController() {
        var vm = this;

        vm.socials = [
            {
                name: 'facebook',
                url: 'https://www.facebook.com/dreamtamecom'
            },
            {
                name: 'instagram',
                url: 'https://www.instagram.com/dreamtamecom'
            },
            {
                name: 'youtube',
                url: 'https://www.youtube.com/channel/UCnvP_yMbtrrcIYwtcqykabw'
            }
        ];

        vm.getSocialClass = getSocialClass;

        activate();

        function activate() {

        }

        function getSocialClass(name) {
            return 'fa fa-' + name;
        }
    }
})();