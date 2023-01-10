
//PUNTUACION

let anchuraElegida = window.location.search;
anchuraElegida = anchuraElegida.replace("?", "");

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
    texto.setAttribute('position', "0 0 1");
    texto.setAttribute('text', "value:HIGH SCORE: 0; width: " + data.anchuraTexto + "; height: " + data.alturaTexto + "; align: center; color: #FFFFFF; shader: msdf; font: " + fuenteScore);

    if (el.getAttribute("id") === "scoreTrasero") {
      texto.setAttribute('rotation', "-180 0 -180");
      texto.id = "valorscoretrasero";
    } else {
      texto.id = "valorscore";
    }

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
    positionSuelo: {default: "0 0 0"},
    colorTablero: {default: "white"},
    alturaPared: {default: 0},
    anchuraPared: {default: 0},
    positionParedIzq: {default: "0 0 0"},
    positionParedDer: {default: "0 0 0"},
    idtablero: {default: ""},
    idSuelo: {default: ""},
    idParedDer: {default: ""},
    idParedIzq: {default: ""}
  },

  init: function() {
    var el = this.el;
    var data = this.data;

    var positionIzq = - (parseInt(anchuraElegida) - 1) / 2;
    var positionDer = (parseInt(anchuraElegida) - 1) / 2;

    var positionParedIzq = positionIzq + " " + data.positionParedIzq;
    var positionParedDer = positionDer + " " + data.positionParedDer;

    var suelo = document.createElement('a-box');
    suelo.setAttribute('height', data.alturaSuelo);
    suelo.setAttribute('width', anchuraElegida);
    suelo.setAttribute('position', data.positionSuelo);
    suelo.setAttribute('color', data.colorTablero);
    suelo.id = data.idSuelo;

    var paredIzq = document.createElement('a-box');
    paredIzq.setAttribute('height', data.alturaPared);
    paredIzq.setAttribute('width', data.anchuraPared);
    paredIzq.setAttribute('position', positionParedIzq);
    paredIzq.setAttribute('color', data.colorTablero);
    paredIzq.id = data.idParedIzq;

    var paredDer = document.createElement('a-box');
    paredDer.setAttribute('height', data.alturaPared);
    paredDer.setAttribute('width', data.anchuraPared);
    paredDer.setAttribute('position', positionParedDer);
    paredDer.setAttribute('color', data.colorTablero);
    paredDer.id = data.idParedDer;

    el.appendChild(suelo);
    el.appendChild(paredIzq);
    el.appendChild(paredDer);

    if (data.idtablero == "tablero") {
      iniciaVariablesEntorno(data, positionIzq, positionDer, anchuraElegida);

      crearTablero(anchuraTablero, alturaTablero + 4, tablero);
      imprimeTablero(tablero);
    } else if (data.idtablero == "tablerotrasero") {
      crearTablero(anchuraTablero, alturaTablero + 4, tableroTrasero);
      imprimeTablero(tableroTrasero);
    }
  },
  tick: function() {
    var el = this.el;
    var id = el.getAttribute('id');

    if (id == "tablero") {
      var suelo = document.getElementById('suelo');
      var entornoPiezas = document.getElementById("piezas");

      if (crearPieza) {
        imprimeTableroBool = true;
        contadorPieza += 1;

        eliminarFilasCompletas(tablero, "def");
        crearPiezaFunction(entornoPiezas, suelo);
        crearPieza = false;
      }
    } else if (id == "tablerotrasero") {
      var suelo = document.getElementById('suelo_trasero');
      var entornoPiezas = document.getElementById("piezas_traseras");

      if (crearPiezaTrasera) {
        imprimeTableroBool = true;
        contadorPiezaTrasera += 1;

        eliminarFilasCompletas(tableroTrasero, "tras");
        crearPiezaFunction(entornoPiezas, suelo);
        crearPiezaTrasera = false;
      }
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

    var position = "";

    if (data.id === "rotarPieza") {
      position = (anchuraElegida/2) + 4;
    } else {
      position = -(anchuraElegida/2) - 4;
    }

    var positionFinal = position + " " + data.position;

    el.setAttribute('position', positionFinal);
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

    if (data.id === "rotarPiezaTrasera") {
      texto.setAttribute('rotation', "-180 0 -180");
    }

    el.appendChild(texto);
  },

  tick: function() {
    var el = this.el;
    var id = el.getAttribute('id');

    el.addEventListener('grab-start', function(event) {
      if (id == "rotarPieza") {
        rotarPieza = true;
      } else if (id == "rotarPiezaTrasera") {
        rotarPiezaTrasera = true;
      }
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

    var position = "";

    if (data.id === "bajarPieza") {
      position = -(anchuraElegida/2) - 4;
    } else {
      position = (anchuraElegida/2) + 4;
    }

    var positionFinal = position + " " + data.position;

    el.setAttribute('position', positionFinal);
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

    if (data.id === "bajarPiezaTrasera") {
      texto.setAttribute('rotation', "-180 0 -180");
    }

    el.appendChild(texto);
  },

  tick: function() {
    var el = this.el;
    var id = el.getAttribute('id');

    el.addEventListener('grab-start', function(event) {
      if (id == "bajarPieza") {
        bajarPieza = true;
      } else if (id == "bajarPiezaTrasera") {
        bajarPiezaTrasera = true;
      }
    });
  }
});




//CREACIÓN DEL CONTROLADOR
AFRAME.registerComponent('mando', {
  schema: {
    position: {default: "0 0 0"},
    height: {default: 0},
    rotation: {default: "0 0 0"},
    color: {default: "white"},
    id: {default: ""}
  },

  init: function() {
    var el = this.el;
    var data = this.data;

    var width = (anchuraElegida - 2) / 2;

    el.setAttribute('position', data.position);
    el.setAttribute('color', data.color);
    el.setAttribute('width', width);
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

    if (el.getAttribute("id") === "controller") {
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
    var position = el.getAttribute('position');
    var alturaPieza = el.getAttribute('height');
    var anchuraPieza = el.getAttribute('width');
    var positionTmp = {x: position.x, y: position.y - data.velocidad, z: position.z};

    var normal = false;
    var trasera = false;

    if (idPieza.includes("cubo_trasero")) {
      trasera = true;
      var numPieza = idPieza.split("cubo_trasero")[1];
      var posX = dameCoordenadaX(position.x, anchuraPieza);
      var positionAux = position;
      var tab = tableroTrasero;
      var cont = contadorPiezaTrasera;
    } else {
      normal = true;
      var numPieza = idPieza.split("cubo")[1];
      var posX = dameCoordenadaX(position.x, anchuraPieza);
      var positionAux = position;
      var tab = tablero;
      var cont = contadorPieza;
    }

    var posY = dameCoordenadaY(position.y, alturaPieza);
    revisaPosicionHorizontalPieza(el, positionAux, alturaPieza, anchuraPieza);
    revisaPosicionVerticalPieza(el, posX, posY, alturaPieza, anchuraPieza, tab);


    if (numPieza == cont) {
      if (!this.tocaSuelo) {
        if (el != null) {
          el.setAttribute('position', positionTmp);

          if ( (rotarPiezaTrasera && trasera) || (rotarPieza && normal) ) {
            rotarPiezaFunction(el, posX, posY, idPieza);
          }

          if ( (bajarPiezaTrasera && trasera) ||  (bajarPieza && normal) ) {
            bajarPiezaFunction(el, posX, posY, idPieza);
          }

          if ( (moverPiezaTrasera && trasera) || (moverPieza && normal) ) {
            moverPiezaFunction(el, idPieza);
          }
        }
      } else {

        if (imprimeTableroBool) {
          actualizaTablero(posX, posY, anchuraPieza, alturaPieza, cont, tab);
          imprimeTableroBool = false;
        }

        if (trasera) {
          tipoPiezaMarcador = "tras";
        } else {
          tipoPiezaMarcador = "def";
        }

        actualizaMarcadorPieza = true;


        if (!isGameOver()) {
          if (trasera) {
            crearPiezaTrasera = true;
            bajarPiezaTrasera = false;
            rotarPiezaTrasera = false;
          } else {
            crearPieza = true;
            bajarPieza = false;
            rotarPieza = false;
          }
        } else {
          location.replace("../gameover.html?puntuacion=" + scoreActual);
        }
      }
    }
  }
});
