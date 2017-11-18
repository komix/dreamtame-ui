(function () {
    'use strict';

    angular
        .module('app')
        .controller('AboutController', AboutController);

    AboutController.$inject = [];

    function AboutController() {
        var vm = this;
        $(".form-control").keyup(function(){
            console.log('нажалась кнопка');
            console.log('Зараз символів: ' + this.value.length);

            if (this.value.length === this.maxLength) {
                console.log('Досягнуто максимальну кількість.');
            }

         if (this.value.length === this.maxLength) {
             var $next = $(this).next('.form-control');
             if ($next.length) {
                 $next.focus();
             } else {
                 $(this).blur();
             }
         }
     });
    }

})();

