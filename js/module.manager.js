(function(){
    var module =  angular.module("manger",['historia','enfrentamientos','personajes','notas']);


    module.controller("rolController",function($scope){

        $scope.algo="una cosa de angular";
        $scope.agregaCampania = agregaCampania;
        $scope.cambiarVista = cambiarVista;
        $scope.guardar = guardar;
        $scope.fileSelected = fileSelected;
        $scope.exportar = exportar;
        $scope.campanias = localStorage.campanias === undefined ? [] : JSON.parse(localStorage.campanias);
        $scope.menu = [
            {id:"historia",label:"Historia"},
            {id:"enfrentamientos",label:"Enfrentamientos"},
            {id:"personajes",label:"PNJs y monstruos"},
            {id:"notas",label:"Notas"}
        ];


        $scope.campaniaseleccionada = $scope.campanias[$scope.campanias.length-1] ;


        $scope.$watch("campanias",guardar,true);

        function agregaCampania(){
            $scope.campanias.push({titulo:"sin titulo",historia:{titulo:"raiz", nodos:[]}});
            $scope.nuevaCampania = null;
            $scope.campaniaseleccionada = $scope.campanias[$scope.campanias.length-1] ;
        }

        function guardar(){
             localStorage.campanias = JSON.stringify($scope.campanias);

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
            // debugger;

            var file = e.currentTarget.files[0];
            alert(file.type);

            // if (file.type == "application/json") {
                var reader = new FileReader();

                reader.onload = function(e) {

                    // debugger;
                    // fileDisplayArea.innerText = reader.result;

                    var nuevaCampania  = JSON.parse(reader.result);

                    $scope.campanias.push(nuevaCampania);
                    $scope.$apply();
                };

                reader.readAsText(file);
            // } else {
            //     alert("archivo no soportado");
            // }

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
