
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
        piezaTocaSuelo = true;
      } else {
        var ocupada = false;
        for (let i=0; i<anchuraPieza; i++) {
          if (casillaEstaOcupada(Number(posX) + i, posY)) {
            ocupada = true;
          }
        }
        if (ocupada) {
          piezaTocaSuelo = true;
        } else {
          piezaTocaSuelo = false;
        }
      }
    }
  }
}

function revisaPosicionHorizontalPieza (position, alturaPieza, anchuraPieza) {
  if (position.x <= limiteIzq + anchuraPieza/2) {
    piezaTocaParedIzq = true;
  } else {
    piezaTocaParedIzq = false;
  }

  if (position.x >= limiteDer - anchuraPieza/2) {
    piezaTocaParedDer = true;
  } else {
    piezaTocaParedDer = false;
  }
}


function crearPiezaFunction (entorno) {
  var pieza = document.createElement("a-box");

  pieza.classList.add("cubo");
  pieza.id = "cubo" + contadorPieza;
  pieza.setAttribute('cubo', damePropsPieza());

  entorno.appendChild(pieza);
}


function rotarPiezaFunction (el) {

  rotarPieza = false;

  var position = el.getAttribute("position");
  var width = el.getAttribute('width');
  var height = el.getAttribute('height');

  var posX = dameCoordenadaX(position.x, width);
  var posY = dameCoordenadaY(position.y, height);

  if ( Number(posX) + Number(height) > anchuraTablero) {
    position = {x:Number(position.x) - Number(height) + Number(width), y:position.y, z:position.z};
    posX = Number(posX) - Number(height) + Number(width);
  }

  for (let i=0; i<width; i++) {
    for (let j=0; j<height; j++) {
      if ( posY != null && (posY + i) <= alturaTablero ) {
        if (casillaEstaOcupada(Number(posX) + Number(j), Number(posY) + Number(i))) {
          console.log("No es posible rotar la pieza");
          return;
        }
      }
    }
  }

  var nuevaPosition = {x:position.x + height/2 - width/2, y:position.y - height/2 + width/2, z:position.z};

  el.setAttribute('position', nuevaPosition);
  el.setAttribute('width', height);
  el.setAttribute('height', width);

}

function bajarPiezaFunction (el) {

  bajarPieza = false;

  var position = el.getAttribute("position");
  var height = el.getAttribute('height');
  var width = el.getAttribute('width');

  var positionBajar = {x: position.x, y: position.y - 1, z: position.z};

  var posX = dameCoordenadaX(position.x, width);
  var posY = dameCoordenadaY(position.y, height);

  if ( (posY - 1) >= alturaSuelo && tablero[posY-1][posX] == ".") {
    el.setAttribute('position', positionBajar);
  } else {
    console.log ("No es posible bajar la pieza");
  }
}


function moverPiezaFunction (el) {

  var position = el.getAttribute("position");
  var width = el.getAttribute('width');
  var height = el.getAttribute('height');

  posController = {x: nuevaPos/2, y: position.y, z: position.z};

  var positionTmp = {x: nuevaPos, y: position.y, z: position.z};

  if (piezaTocaParedDer && !(nuevaPos < position.x)) {
    positionTmp.x = limiteDer - width/2;
  }
  if (piezaTocaParedIzq && !(nuevaPos > position.x)) {
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

  var posY = dameCoordenadaY(position.y, height);
  var posX = dameCoordenadaX(nuevaPos, width);
  var posXReal = dameCoordenadaX(position.x, width);
  var moverPiezaBool = true;

  if (posY == 0 || (posX - posXReal != 1 && posX - posXReal != -1)) {
    moverPiezaBool = false;
  } else {
    for (let i=0; i<width; i++) {
      for (let j=0; j<height; j++) {
        if ( posY != null && (posY + i) <= alturaTablero ) {
          if (casillaEstaOcupada(Number(posX) + Number(i), Number(posY) + Number(j))) {
            console.log("No es posible mover la pieza");
            moverPiezaBool = false;
          }
        }
      }
    }
  }

  if (moverPiezaBool) {
    el.setAttribute('position', positionTmp);
  }

  moverPieza = false;

}
