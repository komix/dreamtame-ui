(function(){
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('institutions.category', {
                    url:'/category/:id',
                    templateUrl: 'institutions-state/category-state/category.view.html',
                    controller: 'CategoryController',
                    controllerAs: 'vm'
                })
        }])
})();