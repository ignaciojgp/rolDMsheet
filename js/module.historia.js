(function(){
    var module = angular.module("historia",[]);

    module.directive('historia', function() {
      return {
        templateUrl: 'template.historia.html',
        controller: function($scope){},
        scope:{
            "campania":"="
        }
      };
    });

    module.directive('nodoHistoria', function() {
      return {
        templateUrl: 'template.historia.nodo.html',
        controller: function($scope){

            $scope.addNode = function(){

                var subnodo = {
                    titulo:"Sin titulo",
                    nodos:[]
                };

                $scope.nodo.nodos.push(subnodo);
            };

            $scope.deleteNode = function(index){
                if(confirm("seguro?")){
                    $scope.nodo.nodos.splice(index, 1);

                }
            };


        },
        scope:{
            "nodo":"="
        }
      };
    });



})();
