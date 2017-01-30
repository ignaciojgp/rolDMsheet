(function(){
    var module =  angular.module("manger",['historia','enfrentamientos','personajes','notas','ui.bootstrap']);


    module.controller("rolController",function($scope, $uibModal){

        $scope.algo="una cosa de angular";
        $scope.agregaCampania = agregaCampania;
        $scope.cambiarVista = cambiarVista;
        $scope.guardar = guardar;
        $scope.fileSelected = fileSelected;
        $scope.exportar = exportar;
        $scope.keyCommand = keyCommand;
        $scope.closePopupResultados = closePopupResultados;
        $scope.ejecutaComando = ejecutaComando;
        $scope.eliminarCampania = eliminarCampania;
        $scope.seleccionar = seleccionar;
        $scope.cerrar = cerrar;
        $scope.campanias = localStorage.campanias === undefined ? [] : JSON.parse(localStorage.campanias);
        $scope.myPopoverTemplate = "myPopoverTemplate.html";
        $scope.menu = [
            {id:"historia",label:"Historia"},
            {id:"enfrentamientos",label:"Enfrentamientos"},
            {id:"personajes",label:"PNJs y monstruos"},
            {id:"notas",label:"Notas"}
        ];


        $scope.vista= sessionStorage.ultimaPestania? sessionStorage.ultimaPestania:"personajes" ;

        $scope.$watch("vista",function(){
            sessionStorage.ultimaPestania = $scope.vista;
        },true);


        $scope.campaniaseleccionada = sessionStorage.campaniaSeleccionada ? $scope.campanias[parseInt(sessionStorage.campaniaSeleccionada)]:null ;

        $scope.$watch("campanias",guardar,true);

        function agregaCampania(){
            $scope.campanias.push({titulo:"sin titulo",historia:{titulo:"raiz", nodos:[]}});
            $scope.nuevaCampania = null;
            $scope.campaniaseleccionada = $scope.campanias[$scope.campanias.length-1] ;
            sessionStorage.campaniaSeleccionada = $scope.campanias.length-1;
        }

        function seleccionar(campania){
            $scope.campaniaseleccionada = campania;
            sessionStorage.campaniaSeleccionada = $scope.campanias.indexOf(campania);
        }

        function guardar(){
             localStorage.campanias = JSON.stringify($scope.campanias);
        }

        function cerrar(){
            $scope.campaniaseleccionada = null;
            sessionStorage.campaniaSeleccionada = null;
        }

        function exportar(){
            download($scope.campaniaseleccionada.titulo+".json",JSON.stringify($scope.campaniaseleccionada));
        }

        function cambiarVista(item){
            $scope.vista = item.id;
        }

        function download(filename, content) {
            var pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
            pom.setAttribute('download', filename);
            pom.click();
        }


        function readTextFile(file) {
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function ()
            {
                if(rawFile.readyState === 4)
                {
                    if(rawFile.status === 200 || rawFile.status === 0)
                    {
                        var allText = rawFile.responseText;
                        alert(allText);
                    }
                }
            };
            rawFile.send(null);
        }

        function fileSelected(e,i,a){

            var file = e.currentTarget.files[0];

                var reader = new FileReader();

                reader.onload = function(e) {

                    var nuevaCampania  = JSON.parse(reader.result);

                    $scope.campanias.push(nuevaCampania);
                    $scope.$apply();
                };

                reader.readAsText(file);

        }

        function ejecutaComando(){
            if(!$scope.command){
                return;
            }


            $scope.resultadoComando = tiraDados($scope.command.trim());
            $scope.popoverIsOpen = true;

            console.log($scope.resultadoComando);

        }

        function keyCommand(e){
            if(e.charCode === 13){
                ejecutaComando();
            }
        }

        function closePopupResultados(){
            $scope.popoverIsOpen = false;
        }

        function eliminarCampania(index,even){


            if(confirm("¿Estás seguro?")){
                $scope.campanias.splice(index,1);
            }else{
                even.stopImmediatePropagation();

            }
        }

    });


    module.directive('customOnChange', function() {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var onChangeHandler = scope.$eval(attrs.customOnChange);
          element.bind('change', onChangeHandler);
        }
      };
    });

})();
