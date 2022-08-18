
function casillaEstaOcupada (posX, posY) {
  if (tablero[posY][posX] == ".") {
    return false;
  } else {
    return true;
  }
}


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
  for (let i=numFila; i<=alturaTablero; i++) {
    for (let j=1; j<=anchuraTablero; j++) {
      var casilla = tablero[i][j];
      if (casilla != "." && !listaPiezas.includes(casilla)) {
        listaPiezas.push(casilla);
      }
    }
  }

  for (let j=0; j<listaPiezas.length; j++) {
    var pieza = document.getElementById("cubo" + listaPiezas[j]);
    var height = pieza.getAttribute('height');
    var position = pieza.getAttribute('position');
    var entornoPiezas = document.getElementById("piezas");

    var piezaPerteneceAFila = false;
    for (let x=1; x<=anchuraTablero; x++) {
      if (tablero[numFila][x] == listaPiezas[j]) {
        piezaPerteneceAFila = true;
      }
    }
    if (piezaPerteneceAFila) {
      if (Number(height) == 1) {
        entornoPiezas.removeChild(pieza);
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
