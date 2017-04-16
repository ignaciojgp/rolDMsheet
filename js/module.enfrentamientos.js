(function(){
    var module = angular.module("enfrentamientos",['utils']);

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
            $scope.tiradaMultiple = tiradaMultiple;
            $scope.algo = "asdasad";

            $scope.hayClipboard = sessionStorage.personajeCopiado ? true:false;

            $scope.$watch("encuentroseleccionado",calculaAncho,true);


            var tiradas = [].concat(principales,[{nombre:"",tipo:2, id:"-"}],ataques,[{nombre:"",tipo:2, id:"-"}],salvacion,[{nombre:"",tipo:2, id:"-"}],habilidades);


            $scope.campos = tiradas;

            $scope.isDead = function(oponente){
                return parseInt(oponente["PG"]) < parseInt(oponente["Daño"]);
            }

            $scope.$watch("campania",function(){
              $scope.encuentroseleccionado  = $scope.campania.encuentros !== undefined ? $scope.campania.encuentros[0]:null;
            });

            function agregaEncuentro(){

                if($scope.campania.encuentros === undefined) $scope.campania.encuentros = [];

                $scope.campania.encuentros.push({nombre:"Sin nombre"});
            }

            function selecciona(encuentro){
                $scope.encuentroseleccionado = encuentro;
                $scope.$parent.$parent.$parent.showMenu = false;

            }

            function agregarOponente(){

                if($scope.encuentroseleccionado.oponentes === undefined) $scope.encuentroseleccionado.oponentes = [];

                $scope.encuentroseleccionado.oponentes.push({nombre:"Sin nombre"});

            }

            function calculaAncho(){

                if($scope.encuentroseleccionado && $scope.encuentroseleccionado.oponentes){
                    $scope.anchoPanel = "width:"+(($scope.encuentroseleccionado.oponentes.length+1) * 100)+"px";
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

            function tiradaMultiple(caracteristica){
                var comando = "";
                $scope.encuentroseleccionado.oponentes.forEach(function(o,i,a){
                    var mod = o[caracteristica] ? parseInt(o[caracteristica]):0;
                    var smod = "";
                    if(mod != 0){
                        if(mod>0){
                            smod = "+"+mod;
                        }else{
                            smod = ""+mod;
                        }
                    }

                    comando += " 1d20"+smod;

                });

                console.log(comando);

                $scope.$parent.$parent.$parent.command = comando;
                $scope.$parent.$parent.$parent.ejecutaComando();
            }

        },
        scope:{
            "campania":"="
        }
      };
    });



})();
