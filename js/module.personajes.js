(function(){
    var module = angular.module("personajes",[]);

    module.directive('personajes', function($uibModal) {
      return {
        templateUrl: 'template.personajes.html',
        link: function($scope, el, attrs){


            $scope.agregaPersonaje = agregaPersonaje;
            $scope.selecciona = selecciona;
            $scope.getCharMod = getCharMod;
            $scope.getTotalHabilidad = getTotalHabilidad;
            $scope.agregaClase = agregaClase;
            $scope.getNivelTotal = getNivelTotal;
            $scope.getPGTotales = getPGTotales;
            $scope.getAtaqueBase = getAtaqueBase;
            $scope.getAtaqueMelee = getAtaqueMelee;
            $scope.getAtaqueRango = getAtaqueRango;
            $scope.agregaModificador = agregaModificador;
            $scope.getTotalCaracteristica = getTotalCaracteristica;
            $scope.getTotalModsCaracteristica = getTotalModsCaracteristica;
            $scope.generarCaracteristicas = generarCaracteristicas;
            $scope.copiarPersonaje = copiarPersonaje;
            $scope.getTotalPuntosHabilidad = getTotalPuntosHabilidad;
            $scope.agregaConjuro = agregaConjuro;
            $scope.eliminaConjuro = eliminaConjuro;
            $scope.eliminaModificador = eliminaModificador;
            $scope.getCABase = getCABase;
            $scope.getCAToque = getCAToque;
            $scope.getCADesprevenido = getCADesprevenido;
            $scope.getTS = getTS;
            $scope.ataqueBase = ataqueBase;
            $scope.salvacionBase = salvacionBase;
            $scope.eliminaPersonaje = eliminaPersonaje;
            $scope.getNivelPersonaje = getNivelPersonaje;
            $scope.agregarArma = agregarArma;
            $scope.eliminaArma = eliminaArma;
            $scope.ejecutaTiradaDeDanio = ejecutaTiradaDeDanio;
            $scope.ejecutaTiradaDeAtaque = ejecutaTiradaDeAtaque;
            $scope.getTiradaAtaque = getTiradaAtaque;
            $scope.eliminaClase = eliminaClase;
            $scope.eliminaClaseConjuro = eliminaClaseConjuro;
            $scope.getMaxPuntosHabilidad = getMaxPuntosHabilidad;
            $scope.agregarClaseConjurador = agregarClaseConjurador;
            $scope.detalleConjuro = detalleConjuro;
            $scope.niveles = [];
            $scope.nummodificadores = [];
            $scope.nivelesConjuro = [];
            $scope.nivelAgregar = 3;

            for(var i = 0; i<30;i++){
                $scope.niveles.push(i);
            }

            for(var j = -10; j<=10;j++){
                $scope.nummodificadores.push(j);
            }

            for(var g = 0; g<10; g++){
                $scope.nivelesConjuro.push(j);
            }

            $scope.modObjetivos = [].concat(caracteristicas,miscelaneos,armadura,salvacion,habilidades);

            $scope.$watch("campania",function(){
                if($scope.personaje){

                    $scope.personajeseleccionado = $scope.personaje;
                }else{

                    $scope.personajeseleccionado = $scope.campania.personajes !== undefined ? $scope.campania.personajes[0]:null;
                }
            });


            $scope.principales = principales;
            $scope.habilidades = habilidades;
            $scope.caracteristicas = caracteristicas;
            $scope.salvacion = salvacion;

            function agregaPersonaje(){
                if($scope.campania.personajes === undefined) $scope.campania.personajes =[];

                $scope.campania.personajes.push({nombre:"Sin nombre"});

            }

            function selecciona(personaje){

                $scope.personajeseleccionado = personaje;
                $scope.$parent.$parent.$parent.showMenu = false;

            }


            function getTotalHabilidad(habilidad){

                if($scope.personajeseleccionado.habilidadesclaseas == undefined) $scope.personajeseleccionado.habilidadesclaseas = {};

                var  puntos = $scope.personajeseleccionado[habilidad.id] !== undefined ? parseInt( $scope.personajeseleccionado[habilidad.id]) : 0;

                var isClasea = $scope.personajeseleccionado.habilidadesclaseas[habilidad.id];

                if(!isClasea) puntos /=2;

                var mod = getCharMod(getTotalCaracteristica(habilidad.charId)) + getTotalModsCaracteristica(habilidad.id);

                return puntos+mod;

            }


            function agregaClase(){

                if($scope.personajeseleccionado.clases === undefined) $scope.personajeseleccionado.clases = [];
                $scope.personajeseleccionado.clases.push({nombre:"-",nivel:0});
            }

            function getNivelTotal(){
                var n = 0;

                if($scope.personajeseleccionado.clases){

                    $scope.personajeseleccionado.clases.forEach(function(o,i,a){
                        n += parseInt(o.nivel);
                    });
                }

                return n;
            }

            function getPGTotales(){
                var n = 0;

                if($scope.personajeseleccionado.clases){

                    $scope.personajeseleccionado.clases.forEach(function(o,i,a){
                        n += parseInt(o.nivel) * (parseInt(o.dado)  + getCharMod(getTotalCaracteristica("con")));
                    });
                }

                return n;
            }

            function getTS(tipo){
                var n = 0;


                if($scope.personajeseleccionado.clases){

                    $scope.personajeseleccionado.clases.forEach(function(o,i,a){

                        var base;

                        switch (tipo) {
                            case "tsf":
                                base = o.tsForBase;
                                break;
                            case "tsr":
                                base = o.tsRefBase;
                                break;
                            case "tsv":
                                base = o.tsVolBase;
                                break;
                            default:

                        }


                        if(base) n += salvacionBase[base][o.nivel];
                    });
                }


                return n;
            }

            function getCABase(){
                return 10+ getTotalModsCaracteristica('CAbase')+getTotalModsCaracteristica('CAesquiva')+getTotalModsCaracteristica('CAnat')+getTotalModsCaracteristica('CAmagia')+getCharMod(getTotalCaracteristica("des"));
            }

            function getCAToque(){
                return 10+ getTotalModsCaracteristica('CAbase')+getTotalModsCaracteristica('CAesquiva')+getCharMod(getTotalCaracteristica("des"));
            }

            function getCADesprevenido(){
                return 10+ getTotalModsCaracteristica('CAbase')+getTotalModsCaracteristica('CAesquiva')+getTotalModsCaracteristica('CAnat')+getTotalModsCaracteristica('CAmagia');
            }

            function getAtaqueBase(mod){
                var n = 0;

                if($scope.personajeseleccionado.clases){
                    $scope.personajeseleccionado.clases.forEach(function(o,i,a){


                        if(o.ataquebase) n += ataqueBase[o.ataquebase][o.nivel];
                    });
                }

                return n;

            }

            function getAtaqueMelee(adicional){
                var mod = getCharMod(getTotalCaracteristica("frz"))+parseInt(adicional);
                var base =  getAtaqueBase(0);

                var tiradas = [];
                do{
                    tiradas.push(base+mod);
                    base -= 5;
                }while(base > 0);

                return tiradas;
            }

            function getAtaqueRango(adicional){
                var mod = getCharMod(getTotalCaracteristica('des'))+parseInt(adicional);
                var base =  getAtaqueBase(0);

                var tiradas = [];
                do{
                    tiradas.push(base+mod);
                    base -= 5;
                }while(base > 0);

                return tiradas;
            }

            function agregaModificador(){
                if($scope.personajeseleccionado.modificadores === undefined) $scope.personajeseleccionado.modificadores = [];

                $scope.personajeseleccionado.modificadores.push({nombre:"Sin nombre",mod:0});
            }

            function getTotalModsCaracteristica(id){
                var n = 0;


                if($scope.personajeseleccionado.modificadores){
                    $scope.personajeseleccionado.modificadores.forEach(function(o,i,a){
                        if(o.objetivo == id && o.activo){
                            n+=parseInt(o.mod);
                        }
                    });
                }

                return n;
            }

            function getTotalCaracteristica(id){
                return parseInt($scope.personajeseleccionado[id]) + getTotalModsCaracteristica(id);
            }

            function getTotalPuntosHabilidad(){
                n = 0;
                habilidades.forEach(function(o,i,a){

                    var v = $scope.personajeseleccionado[o.id] ? $scope.personajeseleccionado[o.id] : 0;
                    n+= parseInt(v);


                });



                return n;


            }
            function agregarClaseConjurador(){

                if($scope.personajeseleccionado.clasesConjurador == undefined){
                    $scope.personajeseleccionado.clasesConjurador = new Array();
                }
                $scope.personajeseleccionado.clasesConjurador.push({clase:"nombre clase", conjurosdiarios:[]});


            }
            function eliminaClaseConjuro(index){

                if(confirm("¿estas seguro?")){

                    $scope.personajeseleccionado.clasesConjurador.splice(index,1);
                }

            }
            function agregaConjuro(nivel, clase){
                if($scope.personajeseleccionado.listaconjuros === undefined) $scope.personajeseleccionado.listaconjuros = [];
                $scope.conjuroSeleccionado = {nombre:"Sin nombre",nivel: nivel, clase:clase};
                $scope.personajeseleccionado.listaconjuros.push($scope.conjuroSeleccionado);


            }

            function eliminaConjuro(conjuro){

                if(confirm("¿estas seguro?")){

                    var index = $scope.personajeseleccionado.listaconjuros.indexOf(conjuro);

                    $scope.personajeseleccionado.listaconjuros.splice(index,1);
                }

            }

            function eliminaPersonaje(pesonaje){
                var index = $scope.campania.personajes.indexOf($scope.personajeseleccionado);
                if(confirm("¿Estás seguro?")){
                    $scope.campania.personajes.splice(index,1);
                    $scope.personajeseleccionado = $scope.campania.personajes[0];
                }
            }

            function getNivelPersonaje(){
                var px = parseInt($scope.personajeseleccionado.experiencia);
                var n=0;
                niveles.forEach(function(o,i,a){
                    if(px >= o){
                        n = i+1;
                    }
                });

                return n;

            }

            function copiarPersonaje(){
                var p = JSON.stringify($scope.personajeseleccionado);
                var paraEnfrentamiento = {
                    nombre: $scope.personajeseleccionado.nombre,
                    Nivel: getNivelTotal(),
                    DG: getNivelTotal(),
                    PG: getPGTotales(),
                    CA: getCABase(),
                    CAToque: getCAToque(),
                    CADesprevenido: getCADesprevenido(),
                    Ini: getTotalModsCaracteristica('iniciativa') + getCharMod(getTotalCaracteristica('des')),
                    ATBase: getAtaqueBase(0),
                    ATMelee:getAtaqueMelee().join(' / '),
                    ATRango: getAtaqueRango().join(' / ')
                };

                salvacion.forEach(function(o,i,a){
                    paraEnfrentamiento[o.id] = getTS(o.id)+getCharMod(getTotalCaracteristica(o.charId));
                });


                habilidades.forEach(function(o,i,a){
                    paraEnfrentamiento[o.id] = $scope.getTotalHabilidad(o);
                });

                console.log(paraEnfrentamiento);

                sessionStorage.personajeCopiado = JSON.stringify(paraEnfrentamiento);



            }

            function agregarArma(){
                if($scope.personajeseleccionado.armas === undefined) $scope.personajeseleccionado.armas = [];

                $scope.personajeseleccionado.armas.push({});
            }
            function eliminaArma(index){

                if(confirm("¿estás seguro?")){

                    $scope.personajeseleccionado.armas.splice(index,1);
                }
            }
            function getTiradaAtaque(arma){

                if(arma.tipo == "melee"){
                    return getAtaqueMelee(arma.mod);
                }else{
                    return getAtaqueRango(arma.mod);
                }

            }

            function ejecutaTiradaDeDanio(arma){
                $scope.$parent.$parent.$parent.command = arma.danio;
                $scope.$parent.$parent.$parent.ejecutaComando();
            }

            function ejecutaTiradaDeAtaque(arma){
                var comando = "";
                var tirada =  getTiradaAtaque(arma);

                for(var i in tirada){
                    comando += "1d20+"+tirada[i]+" ";
                }

                $scope.$parent.$parent.$parent.command = comando;
                $scope.$parent.$parent.$parent.ejecutaComando();
            }
            function eliminaClase(index){
                if(confirm("¿estás seguro?")){

                    $scope.personajeseleccionado.clases.splice(index,1);
                }
            }
            function eliminaModificador(modificador){
                if(confirm("¿estás seguro?")){
                    var index = $scope.personajeseleccionado.modificadores.indexOf(modificador);
                    $scope.personajeseleccionado.modificadores.splice(index,1);
                }
            }

            function getMaxPuntosHabilidad(){

                var p = 0;
                for(var i in $scope.personajeseleccionado.clases){
                    if(parseInt($scope.personajeseleccionado.clases[i].nivel)>0){

                        p+= (parseInt($scope.personajeseleccionado.clases[i].puntohabilidad) + getCharMod(getTotalCaracteristica("int")))* parseInt($scope.personajeseleccionado.clases[i].nivel)+3;
                    }
                }

                return p;
            }

            function generarCaracteristicas(){

                $scope.$parent.$parent.$parent.command = "caracteristicas";
                $scope.$parent.$parent.$parent.ejecutaComando();

            }

            function detalleConjuro(conjuro){


                $uibModal.open({
                     animation: true,
                     ariaLabelledBy: 'modal-title-bottom',
                     ariaDescribedBy: 'modal-body-bottom',
                     templateUrl: 'stackedModal.html',

                     controller: function($uibModalInstance,$scope, item, nivelesConjuro) {
                       $scope.name = 'bottom';

                       $scope.conjuro = item;

                       $scope.nivelesConjuro = nivelesConjuro

                       $scope.dismiss = function(){
                            $uibModalInstance.dismiss('cancel');
                       }

                       $scope.options = {
                          language: 'es',
                          allowedContent: true,
                          entities: false,
                          height:215,
                          toolbar: [
                               ['Styles','Format','Font','FontSize','Bold','Italic','Underline','StrikeThrough','-','Undo','Redo','-','Cut','Copy','Paste','Find','Replace','-','Outdent','Indent','-','Print'],
                               '/',
                               ['NumberedList','BulletedList','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','Table','TextColor','BGColor']
                            ]
                        };
                   },resolve: {
                        item: function () {
                          return conjuro;
                      },
                        nivelesConjuro: function () {
                          return $scope.nivelesConjuro;
                        }
                      }
                  });
            }
        },
        scope:{
            "campania":"=",
            "personaje":"="
        }
      };
    });





})();
