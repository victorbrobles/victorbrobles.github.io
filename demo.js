
let fuenteScore = "https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/creepster/Creepster-Regular.json";

//Booleans para saber la posición de la pieza
let piezaTocaSuelo = false;
let piezaTocaParedIzq = false;
let piezaTocaParedDer = false;


//Límites horizontales y límite vertical
let alturaSuelo = 0;
let limiteIzq = 0;
let limiteDer = 0;

//Booleans para activar funciones
let rotarPieza = false;
let bajarPieza = false;
let moverPieza = false;
let crearPieza = true;
let actualizaMarcadorPieza = false;
let actualizaMarcadorFila = false;

//Inicialización del controlador
let posController = {x: 0, y: 0, z: 0};

//Variable de nueva posición pieza
let nuevaPos = "";

//Tablero
let tablero = [];
let anchuraTablero = 0;
let alturaTablero = 0;

//Piezas
let contadorPieza = 0;

//Otras variables
let velocidad = 0.005;
let scoreActual = 0;
let imprimeTableroBool = true;
let numFilasEliminadas = 0;


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
    var el = this.el;
    var data = this.data;

    if (actualizaMarcadorPieza && !isGameOver()) {

      var pieza = document.getElementById("cubo" + contadorPieza);
      var alturaPieza = pieza.getAttribute('height');
      var anchuraPieza = pieza.getAttribute('width');

      var valorTotal = Number(alturaPieza) * Number(anchuraPieza) * 100;
      scoreActual = Number(scoreActual) + Number(valorTotal);

      var texto = document.getElementById("valorscore");
      texto.setAttribute('text', "value:HIGH SCORE: " + scoreActual + "; width: " + data.anchuraTexto + "; height: " + data.alturaTexto + "; align: center; color: #FFFFFF; shader: msdf; font: " + fuenteScore);
      actualizaMarcadorPieza = false;

    } else if (actualizaMarcadorFila && !isGameOver()) {

      scoreActual = Number(scoreActual) + (5000 * numFilasEliminadas);

      var texto = document.getElementById("valorscore");
      texto.setAttribute('text', "value:HIGH SCORE: " + scoreActual + "; width: " + data.anchuraTexto + "; height: " + data.alturaTexto + "; align: center; color: #FFFFFF; shader: msdf; font: " + fuenteScore);
      actualizaMarcadorFila = false;

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

    var positionYSuelo = Number(data.positionSuelo.split(" ")[1]);
    alturaSuelo = positionYSuelo + Number(data.alturaSuelo) / 2;

    var positionXParedIzq = Number(data.positionParedIzq.split(" ")[0]);
    limiteIzq = positionXParedIzq + Number(data.anchuraPared) / 2;

    var positionXParedDer = Number(data.positionParedDer.split(" ")[0]);
    limiteDer = positionXParedDer - Number(data.anchuraPared) / 2;

    anchuraTablero = Number(data.anchuraSuelo) - 2 * Number(data.anchuraPared);
    alturaTablero = Number(data.alturaPared) - Number(data.alturaSuelo);

    crearTablero(anchuraTablero, alturaTablero + 4);
    imprimeTablero();

  },
  tick: function() {

    var entorno = document.getElementById("entorno");

    if (crearPieza) {

      eliminarFilasCompletas();

      imprimeTableroBool = true;
      contadorPieza += 1;

      var pieza = document.createElement("a-box");

      pieza.classList.add("cubo");
      pieza.id = "cubo" + contadorPieza;
      pieza.setAttribute('cubo', damePropsPieza());

      entorno.appendChild(pieza);
    }

    var pieza = document.getElementById("cubo" + contadorPieza);

    var position = pieza.getAttribute('position');
    var alturaPieza = pieza.getAttribute('height');
    var anchuraPieza = pieza.getAttribute('width');

    if (alturaPieza != null && anchuraPieza != null) {

      var posX = dameCoordenadaX(position.x, anchuraPieza);
      var posY = dameCoordenadaY(position.y, alturaPieza);

      //console.log("Pos [" + posX + "," + posY + "]");

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

      if (piezaTocaSuelo && imprimeTableroBool) {
        actualizaTablero(posX,posY,anchuraPieza,alturaPieza, contadorPieza);
        imprimeTableroBool = false;
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
    var data = this.data;

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
    var data = this.data;

    el.addEventListener('grab-start', function(event) {
      bajarPieza = true;
      //location.replace("https://www.google.com")
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

    var position = el.getAttribute('position');

    if (posController.x != position.x) {
      moverPieza = true;
      nuevaPos = position.x * 2;
    }

    if (!piezaTocaSuelo) {
      el.addEventListener('grab-end', function(event) {

        var positionFinal = controller.getAttribute("position");

        var positionZ = data.position.split(" ")[2];
        var positionAux = {x: positionFinal.x, y: positionFinal.y, z: positionZ};

        var mando = document.getElementById("mando");
        var longitud = mando.getAttribute("width");
        var limiteX = longitud / 2;

        if (positionFinal.x < -limiteX) {
          positionAux.x = -limiteX;
        }

        if (positionFinal.x > limiteX) {
          positionAux.x = limiteX;
        }

        el.setAttribute('position', positionAux);
      });
    } else {
      var positionAux = {x: 0, y: position.y, z: position.z};
      el.setAttribute('position', positionAux);
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

    crearPieza = false;
  },

  tick: function() {

    var el = document.getElementById("cubo" + contadorPieza);
    var data = this.data;

    if (!piezaTocaSuelo) {

      if (el != null) {
        var position = el.getAttribute("position");
        var positionTmp = {x: position.x, y: position.y - data.velocidad, z: position.z};
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

      actualizaMarcadorPieza = true;

      if (!isGameOver()) {
        crearPieza = true;
        piezaTocaSuelo = false;
        bajarPieza = false;
        rotarPieza = false;
      } else {
        location.replace("gameover.html")
      }
    }
  }
});
