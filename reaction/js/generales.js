
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function damePropsPieza (suelo) {
  var anchuras = [1, 1, 1, 2, 3, 4];
  var alturas = [1, 1, 1, 2, 3, 4];

  var altura = alturas[Math.floor(Math.random() * alturas.length)];
  var anchura = anchuras[Math.floor(Math.random() * anchuras.length)];

  var position = suelo.getAttribute('position');

  var posX = Math.random() * (limiteDer - limiteIzq) + limiteIzq;
  var posXFinal = 0;

  for (let i=0; i < anchuraTablero; i++) {
    var limite = limiteIzq + 0.5 + i;
    if (posX > limite && posX < limite + 1) {
      if ((anchura % 2 ) == 0) {
        posXFinal = limite + 0.5;
      } else {
        posXFinal = limite;
      }
    }
  }

  if (posXFinal + anchura/2 >= limiteDer) {
    posXFinal = limiteDer - anchura/2;
  } else if (posXFinal - anchura/2 <= limiteIzq) {
    posXFinal = limiteIzq + anchura/2;
  }



  var positionAnchuraPar = posXFinal + " " + (alturaTablero + 5) + " " + position.z;
  var positionAnchuraImpar = posXFinal + " " + (alturaTablero + 5) + " " + position.z;


  if ((anchura % 2) == 0) {
    return "position: " + positionAnchuraPar + "; width:" + anchura + "; height:" + altura + "; velocidad: " + velocidad;
  } else {
    return "position: " + positionAnchuraImpar + "; width:" + anchura + "; height:" + altura + "; velocidad: " + velocidad;
  }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}



function iniciaVariablesEntorno (data, positionIzq, positionDer, anchuraElegida) {
  var positionYSuelo = Number(data.positionSuelo.split(" ")[1]);
  alturaSuelo = positionYSuelo + Number(data.alturaSuelo) / 2;

  var positionXParedIzq = Number(positionIzq);
  limiteIzq = positionXParedIzq + Number(data.anchuraPared) / 2;

  var positionXParedDer = Number(positionDer);
  limiteDer = positionXParedDer - Number(data.anchuraPared) / 2;

  anchuraTablero = Number(anchuraElegida) - 2 * Number(data.anchuraPared);
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
