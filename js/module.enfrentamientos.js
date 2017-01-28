(function(){
    var module = angular.module("enfrentamientos",[]);

    module.directive('enfrentamientos', function() {
      return {
        templateUrl: 'template.enfrentamientos.html',
        controller: function($scope){

            $scope.agregaEncuentro = agregaEncuentro;
            $scope.agregarOponente = agregarOponente;
            $scope.eliminaOponente = eliminaOponente;
            $scope.pegarOponente = pegarOponente;
            $scope.eliminaEncuentro = eliminaEncuentro;
            $scope.selecciona = selecciona;
            $scope.algo = "asdasad";

            $scope.$watch("encuentroseleccionado",calculaAncho,true);


            var tiradas = [].concat(principales,[{nombre:"",tipo:2, id:"-"}],ataques,[{nombre:"",tipo:2, id:"-"}],salvacion,[{nombre:"",tipo:2, id:"-"}],habilidades);


            $scope.campos = tiradas;

            if($scope.campania.encuentros !== undefined) $scope.encuentroseleccionado = $scope.campania.encuentros[0];

            function agregaEncuentro(){

                if($scope.campania.encuentros === undefined) $scope.campania.encuentros = [];

                $scope.campania.encuentros.push({nombre:"Sin nombre"});
            }

            function selecciona(encuentro){
                $scope.encuentroseleccionado = encuentro;
            }

            function agregarOponente(){

                if($scope.encuentroseleccionado.oponentes === undefined) $scope.encuentroseleccionado.oponentes = [];

                $scope.encuentroseleccionado.oponentes.push({nombre:"Sin nombre"});

            }

            function calculaAncho(){

                if($scope.encuentroseleccionado.oponentes){
                    $scope.anchoPanel = "width:"+($scope.encuentroseleccionado.oponentes.length * 100)+"px";
                    $scope.anchoItem = "width:"+(100 / $scope.encuentroseleccionado.oponentes.length)+"%";

                }else{

                    $scope.anchoPanel = "width:0%";
                    $scope.anchoItem = "width:0%";

                }
            }

            function eliminaOponente(index){
                if(confirm("¿estás seguro?")){
                    $scope.encuentroseleccionado.oponentes.splice(index,1);
                }
            }

            function pegarOponente(){
                if($scope.encuentroseleccionado.oponentes === undefined) $scope.encuentroseleccionado.oponentes = [];

                $scope.encuentroseleccionado.oponentes.push(JSON.parse(sessionStorage.personajeCopiado));



            }

            function eliminaEncuentro(){
                if(confirm("¿estás seguro?")){
                    var index =  $scope.campania.encuentros.indexOf($scope.encuentroseleccionado);
                    $scope.campania.encuentros.splice(index,1);
                    if($scope.campania.encuentros !== undefined) $scope.encuentroseleccionado = $scope.campania.encuentros[0];

                }
            }

        },
        scope:{
            "campania":"="
        }
      };
    });



})();
