(function(){
    var module = angular.module("historia",['ckeditor']);

    module.directive('historia', function() {
      return {
        templateUrl: 'template.historia.html',
        controller: function($scope){},
        scope:{
            "campania":"="
        }
      };
    });

    module.directive('nodoHistoria', function($uibModal) {
      return {
        templateUrl: 'template.historia.nodo.html',
        controller: function($scope){

            $scope.options = {
               language: 'es',
               allowedContent: true,
               entities: false,
               height:315
            };



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

            $scope.copiar = function(){
                sessionStorage.nodohistoriacopiado = JSON.stringify($scope.nodo);

            };

            $scope.pegar = function(){
                if(sessionStorage.nodohistoriacopiado ){

                    var nodocopiado = JSON.parse(sessionStorage.nodohistoriacopiado);

                    if(nodocopiado){

                        alert("el nodo");
                        $scope.nodo.nodos.push(nodocopiado);
                    }
                }
            };

            $scope.$watch("nodo.seleccionado",
                function (newVal,oldVal){
                    if(newVal != oldVal){

                        if($scope.nodo.seleccionado){
                            for(var i in $scope.hermanos){
                                if($scope.nodo != $scope.hermanos[i]){
                                    $scope.hermanos[i].descartado = true;

                                }
                            }

                            $scope.nodo.nodosvisibles = true;

                        }else{
                            for(var j in $scope.hermanos){
                                $scope.hermanos[j].descartado = false;
                            }
                            $scope.nodo.nodosvisibles = false;
                        }

                    }

                },true);
                
            $scope.mostrarNodo = function(nodo){

                $uibModal.open({
                     animation: true,
                     ariaLabelledBy: 'modal-title-bottom',
                     ariaDescribedBy: 'modal-body-bottom',
                     templateUrl: 'detailNodo.html',

                     controller: function($scope, nodo) {
                         $scope.nodo=nodo;

                       $scope.options = {
                          language: 'es',
                          allowedContent: true,
                          size:'lg',
                          entities: false,
                          height:315
                        };


                   },resolve: {
                        nodo: function () {
                          return nodo;
                        }
                      }
                  });
            }
        },
        scope:{
            "nodo":"=",
            "hermanos":"="
        }
      };
    });



})();
