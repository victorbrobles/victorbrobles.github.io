
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function damePropsPieza () {
  var anchuras = [1, 1, 1, 2, 3, 4];
  var alturas = [1, 1, 1, 2, 3, 4];

  var altura = alturas[Math.floor(Math.random() * alturas.length)];
  var anchura = anchuras[Math.floor(Math.random() * anchuras.length)];

  if ((anchura % 2) == 0) {
    return "position: 0 25 -20; width:" + anchura + "; height:" + altura + "; velocidad: " + velocidad;
  } else {
    return "position: -0.5 25 -20; width:" + anchura + "; height:" + altura + "; velocidad: " + velocidad;
  }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
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
