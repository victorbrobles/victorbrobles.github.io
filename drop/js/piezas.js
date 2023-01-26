
function dameCoordenadaX (pos, width) {
  for (let i=0; i<anchuraTablero; i++) {
    var entero = Number(limiteIzq) + Number(i);
    if ( (pos - width/2) >= entero && (pos - width/2) < entero + 1) {
      return Number(i) + 1;
    }
  }
  return null;
}

function dameCoordenadaY (pos, height) {
  for (let i=0; i<=tablero.length-1; i++) {
    var entero = tablero.length - i;
    if ( (pos - height/2) < entero && (pos - height/2) >= entero - 1) {
      return entero - 1;
    }
  }
  return null;
}


function revisaPosicionVerticalPieza (pieza, posX, posY, alturaPieza, anchuraPieza) {

  if (alturaPieza != null && anchuraPieza != null) {

    if (posY != null) {

      if (posY == 0) {
        pieza.components.cubo.tocaSuelo = true;
      } else {
        var ocupada = false;
        for (let i=0; i<anchuraPieza; i++) {
          if (casillaEstaOcupada(Number(posX) + i, posY)) {
            ocupada = true;
          }
        }
        if (ocupada) {
          pieza.components.cubo.tocaSuelo = true;
        } else {
          pieza.components.cubo.tocaSuelo = false;
        }
      }
    }
  }
}

function revisaPosicionHorizontalPieza (pieza, position, alturaPieza, anchuraPieza) {
  if (position.x <= limiteIzq + anchuraPieza/2) {
    pieza.components.cubo.tocaParedIzq = true;
  } else {
    pieza.components.cubo.tocaParedIzq = false;
  }

  if (position.x >= limiteDer - anchuraPieza/2) {
    pieza.components.cubo.tocaParedDer = true;
  } else {
    pieza.components.cubo.tocaParedDer = false;
  }
}


function crearPiezas (entornoPiezas, suelo) {
  for (var i=0; i<6; i++) {
    var pieza = document.createElement("a-box");

    contadorPieza++;
    pieza.classList.add("cubo");
    pieza.id = "cubo" + contadorPieza;
    pieza.setAttribute('cubo', damePropsPieza(suelo, i));

    entornoPiezas.appendChild(pieza);
  }
}

function rotarPiezasFunction () {
  rotarPiezas = false;

  for (let i=contadorPieza; i > contadorPieza - 6; i--) {
    let el = document.getElementById("cubo" + i);

    var width = el.getAttribute('width');
    var height = el.getAttribute('height');

    if (!el.components.cubo.tocaSuelo) {
      el.setAttribute('width', height);
      el.setAttribute('height', width);
    }
  }
}


function colocarPiezaFunction (el, positionZInicial) {
  var position = el.getAttribute("position");
  var width = el.getAttribute('width');
  var height = el.getAttribute('height');

  var positionTmp = {x: position.x, y: position.y.toFixed(0), z: positionZInicial};

  revisaPosicionHorizontalPieza(el, position, height, width);

  if (el.components.cubo.tocaParedDer) {
    positionTmp.x = limiteDer - width/2;
  }
  if (el.components.cubo.tocaParedIzq) {
    positionTmp.x = limiteIzq + width/2;
  }

  for (let i=0; i < anchuraTablero; i++) {
    var limite = limiteIzq + 0.5 + i;
    if (positionTmp.x > limite && positionTmp.x < limite + 1) {
      if ((width % 2 ) == 0) {
        positionTmp.x = limite + 0.5;
      } else {
        positionTmp.x = limite;
      }
    }
  }
  el.setAttribute('position', positionTmp);
}
