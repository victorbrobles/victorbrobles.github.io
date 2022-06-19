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

  return "position: 0 25 -20; width:" + anchuras[Math.floor(Math.random() * anchuras.length)] + "; height:" + alturas[Math.floor(Math.random() * alturas.length)]
    + "; velocidad: 0.005";
}

function transformaPosicion (pos, width, perimetro) {

  var xAnchuraPar = limiteIzq + 1.5;
  var xAnchuraImpar = limiteIzq + 1;

  if ( (width % 2) == 0) {
    for (let i=0; i<perimetro-2; i++) {
      var limite = xAnchuraPar + i;
      if (pos == limite) {
        return limite + 0.5;
      }
    }
    return pos;
  } else {
    for (let i=0; i<perimetro-1; i++) {
      var limite = xAnchuraImpar + i;
      if (pos == limite) {
        return limite + 0.5;
      }
    }
    return pos;
  }
}

function transformaCoordenada (pos, perimetro) {

  var x = 0;

  for(let i=0; i<perimetro; i++) {
    var limite = limiteIzq + i;
    if( pos > limite && pos <= limite + 1) {
      return x;
    }
    x += 1;
  }

}

function crearTablero () {

  var suelo = document.getElementById('suelo');
  var pared = document.getElementById('pared_izq');

  var anchuraSuelo = suelo.getAttribute('width');
  var alturaSuelo = suelo.getAttribute('height');

  var anchuraPared = pared.getAttribute('width');
  var alturaPared = pared.getAttribute('height');

  var anchuraTablero = anchuraSuelo - 2 * anchuraPared;
  var alturaTablero = alturaPared - alturaSuelo;

  var contador = 0;

  for (let i=1; i<=anchuraTablero; i++) {
    for (let j=1; j<=alturaTablero; j++) {
      var casilla = []
      casilla[0] = i;
      casilla[1] = j;
      casilla[2] = ".";

      tablero[contador] = casilla;

      contador = parseInt(contador) + parseInt(1);
    }
    contador = parseInt(contador) + parseInt(1);
  }

}


// Transformaciones de la pieza

function rotarPiezaFunction (el) {

  var position = el.getAttribute("position");
  var width = el.getAttribute('width');
  var height = el.getAttribute('height');
  var perimetro = limiteDer - limiteIzq;


  if (width - height > 0) {
    if (position.y > alturaSuelo + (width - height)) {
      el.setAttribute('width', height);
      el.setAttribute('height', width);
    }
  } else {
    if (position.y > alturaSuelo) {
      el.setAttribute('width', height);
      el.setAttribute('height', width);
    }
  }

  var nuevaWidth = el.getAttribute('width');

  if (position.x < limiteIzq + nuevaWidth/2) {
      el.setAttribute('position', {x:limiteIzq + nuevaWidth/2, y:position.y, z:position.z});
  } else if (position.x > limiteDer - nuevaWidth/2) {
      el.setAttribute('position', {x:limiteDer - nuevaWidth/2, y:position.y, z:position.z});
  }

  var nuevaPosition = el.getAttribute('position');

  el.setAttribute ('position', {x: transformaPosicion(nuevaPosition.x, nuevaWidth, perimetro), y:position.y, z:position.z});

  rotarPieza = false;
}



function bajarPiezaFunction (el) {

  var position = el.getAttribute("position");
  var height = el.getAttribute('height');

  var positionBajar = {x: position.x, y: position.y - 1, z: position.z};

  if (position.y > alturaSuelo + 1 + height/2) {
    el.setAttribute('position', positionBajar);
  }
  bajarPieza = false;
}



function moverPiezaFunction (el) {

  var position = el.getAttribute("position");
  var width = el.getAttribute('width');
  var height = el.getAttribute('height');
  var perimetro = limiteDer - limiteIzq;

  posController = {x: nuevaPos/2, y: position.y, z: position.z}
  var positionTmp = {x: nuevaPos, y: position.y, z: position.z};

  if (piezaTocaParedDer && !(nuevaPos < position.x)) {
    positionTmp.x = limiteDer - width/2;
  }
  if (piezaTocaParedIzq && !(nuevaPos > position.x)) {
    positionTmp.x = limiteIzq + width/2;
  }

  for (let i=0; i < perimetro; i++) {
    var limite = limiteIzq + 0.5 + i;
    if (positionTmp.x > limite && positionTmp.x < limite + 1) {
      if ((width % 2 ) == 0) {
        positionTmp.x = limite + 0.5;
      } else {
        positionTmp.x = limite;
      }
    }
  }

  cubo.setAttribute('position', positionTmp);

  moverPieza = false;

}
