
function casillaEstaOcupada (posX, posY, tab) {
  if (tab[posY][posX] == ".") {
    return false;
  } else {
    return true;
  }
}


function crearTablero(anchura, altura, tab) {

  for (let i=1; i<=altura; i++) {
    var columna = [];
    columna[0] = i;
    for (let j=1; j<=anchura; j++) {
      columna[j] = ".";
    }
    tab[i] = columna;
  }
}

function imprimeTablero (tab) {
  for (let i=tab.length - 1; i>=alturaSuelo; i--) {
    console.log(tab[i]);
  }
}


function actualizaTablero (posX, posY, width, height, contadorPieza, tab) {
  for (let i=0; i<width; i++) {
    for (let j=0; j<height; j++) {
      tab[posY + 1 + j][posX + i] = contadorPieza;
    }
  }
  imprimeTablero(tab);
}



function eliminarFilasCompletas(tab, tipoTablero) {
  var filasEliminadas = revisaEliminarFilas(tab);
  var filaAnterior = 0;
  for (let i=0; i<filasEliminadas.length; i++) {
      eliminarFila(filasEliminadas[i] - filaAnterior, tab, tipoTablero);
      filaAnterior += 1;
  }

  if (filasEliminadas.length > 0) {
    sonidoFilaEliminada = true;
    actualizaMarcadorFila = true;
    numFilasEliminadas = filasEliminadas.length;
  }
}

function revisaEliminarFilas(tab) {
  var filasAEliminar = [];
  for (let i=1; i<=alturaTablero; i++) {
    var eliminar = true;
    for (let j=1; j<=anchuraTablero; j++) {
      var casilla = tab[i][j];
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


function eliminarFila (numFila, tab, tipoTablero) {
  var listaPiezas = [];
  for (let i=numFila; i<=alturaTablero; i++) {
    for (let j=1; j<=anchuraTablero; j++) {
      var casilla = tab[i][j];
      if (casilla != "." && !listaPiezas.includes(casilla)) {
        listaPiezas.push(casilla);
      }
    }
  }

  for (let j=0; j<listaPiezas.length; j++) {
    if (tipoTablero == "tras") {
      var pieza = document.getElementById("cubo_trasero" + listaPiezas[j]);
      var entornoPiezas = document.getElementById("piezas_traseras");
    } else {
      var pieza = document.getElementById("cubo" + listaPiezas[j]);
      var entornoPiezas = document.getElementById("piezas");
    }

    var height = pieza.getAttribute('height');
    var position = pieza.getAttribute('position');

    var piezaPerteneceAFila = false;
    for (let x=1; x<=anchuraTablero; x++) {
      if (tab[numFila][x] == listaPiezas[j]) {
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


  for (let y=numFila; y<tab.length-1; y++) {
    for (let z=1; z<=anchuraTablero; z++) {
      tab[y][z] = tab[y+1][z];
    }
  }

  imprimeTablero(tab);
}
