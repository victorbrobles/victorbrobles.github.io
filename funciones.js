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


//Funciones de una casilla

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

function casillaEstaOcupada (posX, posY) {
  if (tablero[posY][posX] == ".") {
    return false;
  } else {
    return true;
  }
}

//


//Funciones del tablero

function crearTablero(anchura, altura) {

  for (let i=1; i<=altura; i++) {
    var columna = [];
    columna[0] = i;
    for (let j=1; j<=anchura; j++) {
      columna[j] = ".";
    }
    tablero[i] = columna;
  }
}

function imprimeTablero () {
  for (let i=tablero.length - 1; i>=alturaSuelo; i--) {
    console.log(tablero[i]);
  }
}

function actualizaTablero (posX, posY, width, height, contadorPieza) {
  for (let i=0; i<width; i++) {
    for (let j=0; j<height; j++) {
      tablero[posY + 1 + j][posX + i] = contadorPieza;
    }
  }
  imprimeTablero();
}

function eliminarFilasCompletas() {
  var filasEliminadas = revisaEliminarFilas();
  var filaAnterior = 0;
  for (let i=0; i<filasEliminadas.length; i++) {
      eliminarFila(filasEliminadas[i] - filaAnterior);
      filaAnterior += 1;
  }

  if (filasEliminadas.length > 0) {
    actualizaMarcadorFila = true;
    numFilasEliminadas = filasEliminadas.length;
  }
}

function revisaEliminarFilas() {
  var filasAEliminar = [];
  for (let i=1; i<=alturaTablero; i++) {
    var eliminar = true;
    for (let j=1; j<=anchuraTablero; j++) {
      var casilla = tablero[i][j];
      if (casilla == ".") {
        eliminar = false;
      }
    }
    if (eliminar) {
      filasAEliminar.push(i);
    }
  }
  return filasAEliminar;
}


function eliminarFila (numFila) {
  var listaPiezas = [];
  console.log("FILA " + numFila);
  for (let i=numFila; i<=alturaTablero; i++) {
    for (let j=1; j<=anchuraTablero; j++) {
      var casilla = tablero[i][j];
      if (casilla != "." && !listaPiezas.includes(casilla)) {
        listaPiezas.push(casilla);
      }
    }
  }

  //console.log("Para la fila " + numFila + " hay que eliminar las piezas " + listaPiezas);

  for (let j=0; j<listaPiezas.length; j++) {
    console.log("PIEZA " + listaPiezas[j]);
    var pieza = document.getElementById("cubo" + listaPiezas[j]);
    var height = pieza.getAttribute('height');
    var position = pieza.getAttribute('position');
    var entorno = document.getElementById("entorno");

    var piezaPerteneceAFila = false;
    for (let x=1; x<=anchuraTablero; x++) {
      if (tablero[numFila][x] == listaPiezas[j]) {
        piezaPerteneceAFila = true;
      }
    }
    if (piezaPerteneceAFila) {
      if (Number(height) == 1) {
        entorno.removeChild(pieza);
      } else {
        pieza.setAttribute('position', {x:position.x, y:position.y - 0.5, z:position.z});
        pieza.setAttribute('height', Number(height) - 1);
      }
    } else {
      pieza.setAttribute('position', {x:position.x, y:position.y - 1, z:position.z});
    }
  }


  for (let y=numFila; y<tablero.length-1; y++) {
    for (let z=1; z<=anchuraTablero; z++) {
      tablero[y][z] = tablero[y+1][z];
    }
  }

  imprimeTablero();
}

//


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


// Transformaciones de la pieza

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

  posController = {x: nuevaPos/2, y: position.y, z: position.z}
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

  el.setAttribute('position', positionTmp);

  moverPieza = false;

}
