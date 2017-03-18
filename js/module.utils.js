(function(){
    var module = angular.module("utils",[]);


    module.directive('calculadora', function($filter) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {

                var filter = $filter("currency");
                var lastViewValue = null;

                // ngModelCtrl.$parsers.push(function(data) {
                //
                //
                //
                //     return data;
                // });
                //
                // ngModelCtrl.$formatters.push(function(data) {
                //
                //
                //
                //     return data;
                // });


                element.bind("keydown keypress", function(event) {


                   if (event.which === 13) {
                       calcula();
                       event.preventDefault();
                   }

               });

               function calcula(){

                   var data = ngModelCtrl.$viewValue;

                   var matchs = /(\d+)([\+|\-]{1})(\d+)/g.exec(data);

                   if(matchs){
                       var n1 = parseFloat(matchs[1]);
                       var n2 = parseFloat(matchs[3]);

                       if(matchs[2]=="+"){
                           ngModelCtrl.$setViewValue(n1+n2);
                        //    ngModelCtrl.$viewValue = (n1+n2);
                       }else{
                           ngModelCtrl.$setViewValue(n1-n2);
                        //    ngModelCtrl.$viewValue = (n1-n2);
                       }

                       ngModelCtrl.$render();

                   }


                   console.log(matchs);


               }




            }
        };

    });

})();
