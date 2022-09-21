//PUNTUACION

AFRAME.registerComponent('score', {
  schema: {
    position: {default: "0 0 0"},
    anchuraTexto: {default: 0},
    alturaTexto: {default:0}
  },

  init: function() {
    var el = this.el;
    var data = this.data;

    el.setAttribute('position', data.position);

    var texto = document.createElement("a-entity");
    texto.id = "valorscore";
    texto.setAttribute('position', "0 0 1");
    texto.setAttribute('text', "value:HIGH SCORE: 0; width: " + data.anchuraTexto + "; height: " + data.alturaTexto + "; align: center; color: #FFFFFF; shader: msdf; font: " + fuenteScore);

    el.appendChild(texto);
  },
  tick: function() {
    var data = this.data;

    if (actualizaMarcadorPieza && !isGameOver()) {
      actualizaMarcadorPiezaFunction(data);
    } else if (actualizaMarcadorFila && !isGameOver()) {
      actualizaMarcadorFilaFunction(data);
    }
  }
});


// CREACIÓN DEL TABLERO

AFRAME.registerComponent('tablero', {
  schema: {
    alturaSuelo: {default: 0},
    anchuraSuelo: {default: 0},
    positionSuelo: {default: "0 0 0"},
    colorTablero: {default: "white"},
    alturaPared: {default: 0},
    anchuraPared: {default: 0},
    positionParedIzq: {default: "0 0 0"},
    positionParedDer: {default: "0 0 0"}
  },

  init: function() {
    var el = this.el;
    var data = this.data;

    var suelo = document.createElement('a-box');
    suelo.setAttribute('height', data.alturaSuelo);
    suelo.setAttribute('width', data.anchuraSuelo);
    suelo.setAttribute('position', data.positionSuelo);
    suelo.setAttribute('color', data.colorTablero);
    suelo.id = 'suelo';

    var paredIzq = document.createElement('a-box');
    paredIzq.setAttribute('height', data.alturaPared);
    paredIzq.setAttribute('width', data.anchuraPared);
    paredIzq.setAttribute('position', data.positionParedIzq);
    paredIzq.setAttribute('color', data.colorTablero);
    paredIzq.id = 'pared_izq';

    var paredDer = document.createElement('a-box');
    paredDer.setAttribute('height', data.alturaPared);
    paredDer.setAttribute('width', data.anchuraPared);
    paredDer.setAttribute('position', data.positionParedDer);
    paredDer.setAttribute('color', data.colorTablero);
    paredDer.id = 'pared_der';

    el.appendChild(suelo);
    el.appendChild(paredIzq);
    el.appendChild(paredDer);

    iniciaVariablesEntorno(data);

    crearTablero(anchuraTablero, alturaTablero + 4);

    var entornoObstaculos = document.getElementById("obstaculos");
    var obstaculos = window.location.search;
    var numObstaculos = obstaculos.split("=")[1];
    crearObstaculos(numObstaculos, entornoObstaculos);

    imprimeTablero();

  },
  tick: function() {
    var el = this.el;
    var entornoPiezas = document.getElementById("piezas");
    var suelo = document.getElementById('suelo');

    if (crearPieza) {
      imprimeTableroBool = true;
      contadorPieza += 1;

      eliminarFilasCompletas();
      crearPiezaFunction(entornoPiezas, suelo);
    }
  }
});


//CREACIÓN DE LOS BOTONES
AFRAME.registerComponent('rotarpieza', {
  schema: {
    position: {default: "0 0 0"},
    width: {default: 0},
    height: {default: 0},
    color: {default: "black"},
    depth: {default: 0},
    id: {default: ""},
    mixin: {default: ""},
    positionText: {default: "0 0 0"},
    colorText: {default: "white"},
    alignText: {default: "center"},
    valueText: {default: ""},
    widthText: {default: 0}
  },

  init: function () {
    var el = this.el;
    var data = this.data;

    el.setAttribute('position', data.position);
    el.setAttribute('color', data.color);
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);
    el.setAttribute('depth', data.depth);
    el.setAttribute('mixin', data.mixin);
    el.classList.add('boton');
    el.id = data.id;

    var texto = document.createElement("a-entity");
    texto.setAttribute('position', data.positionText);
    texto.setAttribute('text', "color: " + data.colorText + "; align: " + data.alignText + "; value: " + data.valueText + "; width: " + data.widthText);

    el.appendChild(texto);
  },

  tick: function() {
    var el = this.el;

    el.addEventListener('grab-start', function(event) {
      rotarPieza = true;
    });
  }
});


AFRAME.registerComponent('bajarpieza', {
  schema: {
    position: {default: "0 0 0"},
    width: {default: 0},
    height: {default: 0},
    color: {default: "black"},
    depth: {default: 0},
    id: {default: ""},
    mixin: {default: ""},
    positionText: {default: "0 0 0"},
    colorText: {default: "white"},
    alignText: {default: "center"},
    valueText: {default: ""},
    widthText: {default: 0}
  },

  init: function () {
    var el = this.el;
    var data = this.data;

    el.setAttribute('position', data.position);
    el.setAttribute('color', data.color);
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);
    el.setAttribute('depth', data.depth);
    el.setAttribute('mixin', data.mixin);
    el.classList.add('boton');
    el.id = data.id;

    var texto = document.createElement("a-entity");
    texto.setAttribute('position', data.positionText);
    texto.setAttribute('text', "color: " + data.colorText + "; align: " + data.alignText + "; value: " + data.valueText + "; width: " + data.widthText);

    el.appendChild(texto);
  },

  tick: function() {
    var el = this.el;

    el.addEventListener('grab-start', function(event) {
      bajarPieza = true;
    });
  }
});




//CREACIÓN DEL CONTROLADOR
AFRAME.registerComponent('mando', {
  schema: {
    position: {default: "0 0 0"},
    width: {default: 0},
    height: {default: 0},
    rotation: {default: "0 0 0"},
    color: {default: "white"},
    id: {default: ""}
  },

  init: function() {
    var el = this.el;
    var data = this.data;

    el.setAttribute('position', data.position);
    el.setAttribute('color', data.color);
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);
    el.setAttribute('rotation', data.rotation);
    el.id = data.id;
  }
});

AFRAME.registerComponent('controller', {
  schema: {
    position: {default: "0 0 0"},
    radius: {default: 0},
    rotation: {default: "0 0 0"},
    mixin: {default: ""},
    color: {default: "white"},
    id: {default: ""}
  },

  init: function() {
    var el = this.el;
    var data = this.data;

    el.setAttribute('position', data.position);
    el.setAttribute('color', data.color);
    el.setAttribute('radius', data.radius);
    el.setAttribute('rotation', data.rotation);
    el.setAttribute('mixin', data.mixin);
    el.id = data.id;
  },

  tick: function() {
    var el = this.el;
    var data = this.data;

    var pieza = document.getElementById("cubo" + contadorPieza);
    var position = el.getAttribute('position');
    var positionPieza = pieza.getAttribute('position');

    if (positionPieza.y == alturaTablero + 5) {
      var positionAux = {x: 0, y: position.y, z: position.z};
      el.setAttribute('position', positionAux);
    }

    if (!pieza.components.cubo.tocaSuelo) {
      if (posController.x != position.x) {
        moverPieza = true;
        nuevaPos = position.x * 2;
      }
      el.addEventListener('grab-end', function(event) {
        moverControlador(controller, data, el);
      });
    }
  }
});


AFRAME.registerComponent('obstaculo', {
  schema: {
    position: {default: "0 0 0"},
    width: {default: "1"},
    height: {default: "1"},
    color: {default: "white"}
  },

  init: function() {

    var el = this.el;
    var data = this.data;

    el.setAttribute('color', data.color);
    el.setAttribute('position', data.position);
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);
  }
});


AFRAME.registerComponent('cubo', {
  schema: {
    position: {default: "0 0 0"},
    width: {default: "1"},
    height: {default: "1"},
    velocidad: {default: "0"}
  },

  init: function() {

    var el = this.el;
    var data = this.data;

    el.setAttribute('color', getRandomColor());
    el.setAttribute('position', data.position);
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);

    this.tocaSuelo = false;
    this.tocaParedDer = false;
    this.tocaParedIzq = false;
    crearPieza = false;
  },

  tick: function() {

    var el = this.el;
    var data = this.data;

    var idPieza = el.getAttribute('id');
    var numPieza = idPieza.split("cubo")[1];

    var position = el.getAttribute('position');
    var alturaPieza = el.getAttribute('height');
    var anchuraPieza = el.getAttribute('width');
    var positionTmp = {x: position.x, y: position.y - data.velocidad, z: position.z};

    var posX = dameCoordenadaX(position.x, anchuraPieza);
    var posY = dameCoordenadaY(position.y, alturaPieza);

    revisaPosicionHorizontalPieza(el, position, alturaPieza, anchuraPieza);
    revisaPosicionVerticalPieza(el, posX, posY, alturaPieza, anchuraPieza);

    if (numPieza == contadorPieza) {
      if (!this.tocaSuelo) {
        if (el != null) {
          el.setAttribute('position', positionTmp);

          if (rotarPieza) {
            rotarPiezaFunction(el);
          }

          if (bajarPieza) {
            bajarPiezaFunction(el);
          }

          if (moverPieza) {
            moverPiezaFunction(el);
          }
        }
      } else {

        if (imprimeTableroBool) {
          actualizaTablero(posX,posY,anchuraPieza,alturaPieza, contadorPieza);
          imprimeTableroBool = false;
        }

        actualizaMarcadorPieza = true;

        if (!isGameOver() && !obstaculoChocado) {
          crearPieza = true;
          bajarPieza = false;
          rotarPieza = false;
        } else {
          location.replace("../gameover.html?puntuacion=" + scoreActual);
        }
      }
    }
  }
});
