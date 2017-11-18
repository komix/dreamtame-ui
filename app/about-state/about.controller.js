(function () {
    'use strict';

    angular
        .module('app')
        .controller('AboutController', AboutController);

    AboutController.$inject = [];

    function AboutController() {
        var vm = this;
        $(".form-control").keyup(function(){
         if (this.value.length == this.maxlength) {
             var $next = $(this).next('.form-control');
             if ($next.length)
                 $(this).next('.form-control').focus();
             else
                 $(this).blur();
         }
     });
    }

})();

