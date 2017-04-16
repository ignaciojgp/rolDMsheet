
function tiraDados(cadena){

    if(cadena == "caracteristicas"){
        cadena = "4d6-min 4d6-min 4d6-min 4d6-min 4d6-min 4d6-min";
    }

  var tiradas = cadena.split(" ");
  var fullRess = [];
  tiradas.forEach(function(o,i,a){
    var res = tirada(o);
    fullRess.push(res);
  });

  return fullRess;
}

function tirada(cadena){



  var reg = /(\d+)(d\d+)([\+|\-][\d|min|max]+)*(\*\d+)*/g;

  var m = reg.exec(cadena);
  if(m){

    var minusmin = m[3] && m[3].indexOf("min") != -1;
    var minusmax = m[3] && m[3].indexOf("max") != -1;

    var numtiradas = m[4] ? parseInt(m[4].replace("*","")):1;
    var modificador = m[3] && !minusmin && !minusmax  ? parseInt(m[3]):0;
    var numDados = m[1] ? parseInt(m[1]):0;
    var resultados = {cadena:cadena,tiradas:[]};

    for(var i=0; i < numtiradas; i++){

      var tirada = {dados:[]};



      for(var j=0; j< numDados;j++){
        var resDado = _tiraDado(m[2]);
        tirada.dados.push(resDado);
      }

      console.log(tirada.dados);

      if(minusmin){
          tirada.ignore = tirada.dados.indexOf(Math.min(...tirada.dados));
      }
      if(minusmax){
          tirada.ignore = tirada.dados.indexOf(Math.max(...tirada.dados));
      }

      console.log("ignora");
      console.log(tirada.ignore);

      tirada.modificador = modificador;

      var cuentaDados = tirada.dados.slice(0);

      if(tirada.ignore != undefined){
          cuentaDados.splice(tirada.ignore,1);
      }

      console.log("cuenta");
      console.log(cuentaDados);
      console.log(tirada.dados);

      tirada.resultado = cuentaDados.reduce(_getSum) + modificador;
      resultados.tiradas.push(tirada);



    }

    var total = 0;
    resultados.tiradas.forEach(function(o,i,a){
      total+=o.resultado;
    })


    resultados.total = total;

    return resultados;
  }else{
    return null;
  }



  //funciones de apoyo

  function _tiraDado(dado){
    var rango = parseInt(dado.replace("d",""));
    if(dado != "d100"){
      rango--;
    }

    var randomNumber = Math.round(Math.random()*rango);

    if(dado != "d100"){
      randomNumber+=1;
    }

    return randomNumber;

  }
  function _getSum(total, num) {
    return total + num;
  }
}
