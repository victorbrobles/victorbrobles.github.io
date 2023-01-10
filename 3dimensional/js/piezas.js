
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


function revisaPosicionVerticalPieza (pieza, posX, posY, alturaPieza, anchuraPieza, tab) {
  if (alturaPieza != null && anchuraPieza != null) {
    if (posY != null) {
      if (posY == 0) {
        pieza.components.cubo.tocaSuelo = true;
      } else {
        var ocupada = false;
        for (let i=0; i<anchuraPieza; i++) {
          if (casillaEstaOcupada(Number(posX) + i, posY, tab)) {
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


function crearPiezaFunction (entornoPiezas, suelo) {
  var pieza = document.createElement("a-box");

  var id = suelo.getAttribute('id');
  if (id == "suelo") {
    var idCubo = "cubo" + contadorPieza;
  } else if (id == "suelo_trasero") {
    var idCubo = "cubo_trasero" + contadorPiezaTrasera;
  }

  pieza.classList.add("cubo");
  pieza.id = idCubo;
  pieza.setAttribute('cubo', damePropsPieza(suelo));

  entornoPiezas.appendChild(pieza);
}


function rotarPiezaFunction (el, posX, posY, idPieza) {

  if (idPieza.includes("cubo_trasero")) {
    var tab = tableroTrasero;
    rotarPiezaTrasera = false;
  } else {
    var tab = tablero;
    rotarPieza = false;
  }

  var position = el.getAttribute("position");
  var width = el.getAttribute('width');
  var height = el.getAttribute('height');

  if ( Number(posX) + Number(height) > anchuraTablero) {
    position = {x:Number(position.x) - Number(height) + Number(width), y:position.y, z:position.z};
    posX = Number(posX) - Number(height) + Number(width);
  }

  for (let i=0; i<width; i++) {
    for (let j=0; j<height; j++) {
      if ( posY != null && (posY + i) <= alturaTablero ) {
        if (casillaEstaOcupada(Number(posX) + Number(j), Number(posY) + Number(i), tab)) {
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

function bajarPiezaFunction (el, posX, posY, idPieza) {
  if (idPieza.includes("cubo_trasero")) {
    var tab = tableroTrasero;
    bajarPiezaTrasera = false;
  } else {
    var tab = tablero;
    bajarPieza = false;
  }

  var position = el.getAttribute("position");

  var positionBajar = {x: position.x, y: position.y - 1, z: position.z};

  if ( (posY - 1) >= alturaSuelo && tab[posY-1][posX] == ".") {
    el.setAttribute('position', positionBajar);
  } else {
    console.log ("No es posible bajar la pieza");
  }
}


function moverPiezaFunction (el, id) {

  var position = el.getAttribute("position");
  var width = el.getAttribute('width');
  var height = el.getAttribute('height');

  if (id.includes("cubo_der")) {
    posControllerDer = {x: nuevaPosDer/2 + posXTablerosDer/3, y: position.y, z: position.z};
    var newPosition = nuevaPosDer;
    var posiReal = Number(newPosition) + Number(posXTablerosDer/3);
    var posXReal = dameCoordenadaX(position.x - posXTablerosDer, width);
    var tab = tableroDer;
  } else if (id.includes("cubo_izq")) {
    posControllerIzq = {x: nuevaPosIzq/2 + posXTablerosIzq/3, y: position.y, z: position.z};
    var newPosition = nuevaPosIzq;
    var posiReal = Number(newPosition) + Number(posXTablerosIzq/3);
    var posXReal = dameCoordenadaX(position.x - posXTablerosIzq, width);
    var tab = tableroIzq;
  } else {
    posController = {x: nuevaPos/2, y: position.y, z: position.z};
    var newPosition = nuevaPos;
    var posiReal = newPosition;
    var posXReal = dameCoordenadaX(position.x, width);
    var tab = tablero;
  }

  var positionTmp = {x: newPosition, y: position.y, z: position.z};

  if (el.components.cubo.tocaParedDer && !(posiReal < position.x)) {
    positionTmp.x = limiteDer - width/2;
  }
  if (el.components.cubo.tocaParedIzq && !(posiReal > position.x)) {
    positionTmp.x = limiteIzq + width/2;
  }

  console.log("newPosition " + newPosition);
  console.log("posiReal " + posiReal);
  console.log("posXReal " + posXReal);
  console.log("positionTmp " + positionTmp.x);

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

  var posX = dameCoordenadaX(newPosition, width);
  var posY = dameCoordenadaY(position.y, height);
  var moverPiezaBool = true;

  console.log("posX " + posX);
  console.log("posY " + posY);

  if (posY == 0 || (posX - posXReal != 1 && posX - posXReal != -1)) {
    moverPiezaBool = false;
  } else {
    for (let i=0; i<width; i++) {
      for (let j=0; j<height; j++) {
        if ( posY != null && (posY + i) <= alturaTablero ) {
          if (casillaEstaOcupada(Number(posX) + Number(i), Number(posY) + Number(j), tab)) {
            console.log("No es posible mover la pieza");
            moverPiezaBool = false;
          }
        }
      }
    }
  }

  if (moverPiezaBool) {
    if (id.includes("cubo_der")) {
      positionTmp = {x: positionTmp.x + posXTablerosDer, y:positionTmp.y, z: positionTmp.z};
    } else if (id.includes("cubo_izq")) {
      positionTmp = {x: positionTmp.x + posXTablerosIzq, y:positionTmp.y, z: positionTmp.z};
    }
    el.setAttribute('position', positionTmp);
  }

  if (id.includes("cubo_der")) {
    moverPiezaDer = false;
  } else if (id.includes("cubo_izq")) {
    moverPiezaIzq = false;
  } else {
    moverPieza = false;
  }

}
