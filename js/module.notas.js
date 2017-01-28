(function(){
    var module = angular.module("notas",['ckeditor']);

    module.directive('notas', function() {
      return {
        templateUrl: 'template.notas.html',
        controller: function($scope){


            $scope.options = {
               language: 'es',
               allowedContent: true,
               entities: false,
               height:315
             };

            if($scope.campania.notas !== undefined){
                $scope.notaseleccionada = $scope.campania.notas[$scope.campania.notas.length-1];
            }

            $scope.agregaNota = function(){
                if($scope.campania.notas === undefined) $scope.campania.notas = [];

                $scope.campania.notas.push({titulo:"Sin título"});
            };



            $scope.seleccionanota = function(nota){
                $scope.notaseleccionada = nota;
            };

            $scope.eliminaNota = function(){
                var index = $scope.campania.notas.indexOf($scope.notaseleccionada);
                if(confirm("¿Estás seguro?")){
                    $scope.campania.notas.splice(index,1);
                    $scope.notaseleccionada = $scope.campania.notas[$scope.campania.notas.length-1];
                }

            };


        },
        scope:{
            "campania":"="
        }
      };
    });

})();
