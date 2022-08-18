
function getRandomColor() {
  var colores = ['blue', 'red', 'yellow', 'green'];
  var indice = Math.floor(Math.random() * 4);
  return colores[indice];
}

function damePropsPieza (suelo) {
  var anchuras = [1, 1, 1, 2, 3, 4];
  var alturas = [1, 1, 1, 2, 3, 4];

  var altura = alturas[Math.floor(Math.random() * alturas.length)];
  var anchura = anchuras[Math.floor(Math.random() * anchuras.length)];

  var position = suelo.getAttribute('position');

  var positionAnchuraPar = position.x + " " + (alturaTablero + 5) + " " + position.z;
  var positionAnchuraImpar = (Number(position.x) - 0.5) + " " + (alturaTablero + 5) + " " + position.z;

  if ((anchura % 2) == 0) {
    return "position: " + positionAnchuraPar + "; width:" + anchura + "; height:" + altura + "; velocidad: " + velocidad;
  } else {
    return "position: " + positionAnchuraImpar + "; width:" + anchura + "; height:" + altura + "; velocidad: " + velocidad;
  }
}



function iniciaVariablesEntorno(data) {
  var positionYSuelo = Number(data.positionSuelo.split(" ")[1]);
  alturaSuelo = positionYSuelo + Number(data.alturaSuelo) / 2;

  var positionXParedIzq = Number(data.positionParedIzq.split(" ")[0]);
  limiteIzq = positionXParedIzq + Number(data.anchuraPared) / 2;

  var positionXParedDer = Number(data.positionParedDer.split(" ")[0]);
  limiteDer = positionXParedDer - Number(data.anchuraPared) / 2;

  anchuraTablero = Number(data.anchuraSuelo) - 2 * Number(data.anchuraPared);
  alturaTablero = Number(data.alturaPared) - Number(data.alturaSuelo);
}




function isGameOver() {
  for (let i=tablero.length -1; i>alturaTablero; i--) {
    for (let j=1; j<=anchuraTablero; j++) {
      if (casillaEstaOcupada(j, i)) {
        return true;
      }
    }
  }
  return false;
}

function revisaColor(pieza, posX, posY, anchuraPieza) {
  var color = pieza.getAttribute('color');

  console.log("Color " + color);
  console.log("posX " + posX);
  console.log("posY " + posY);

  if (posY != 0) {
    var piezasVecinas = [];
    for (var i=0; i<anchuraPieza; i++) {
      var idPieza = tablero[posY][posX + i];
      console.log("idPieza " + idPieza);
      if (idPieza != "." && !piezasVecinas.includes(idPieza)) {
        piezasVecinas.push(idPieza);
      }
    }

    for (var j=0; j<piezasVecinas.length; j++) {
      var piezaAux = document.getElementById("cubo" + piezasVecinas[j]);
      var colorAux = piezaAux.getAttribute('color');

      if (color != colorAux) {
        location.replace("../gameover.html?puntuacion=" + scoreActual);
      }
    }
  }
}
