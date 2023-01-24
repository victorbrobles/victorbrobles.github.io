
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

    var positionIzq = - (parseInt(anchuraElegida) - 1) / 2;
    var positionDer = (parseInt(anchuraElegida) - 1) / 2;

    var positionParedIzq = positionIzq + " " + data.positionParedIzq;
    var positionParedDer = positionDer + " " + data.positionParedDer;

    var suelo = document.createElement('a-box');
    suelo.setAttribute('height', data.alturaSuelo);
    suelo.setAttribute('width', anchuraElegida);
    suelo.setAttribute('position', data.positionSuelo);
    suelo.setAttribute('color', data.colorTablero);
    suelo.id = 'suelo';

    var paredIzq = document.createElement('a-box');
    paredIzq.setAttribute('height', data.alturaPared);
    paredIzq.setAttribute('width', data.anchuraPared);
    paredIzq.setAttribute('position', positionParedIzq);
    paredIzq.setAttribute('color', data.colorTablero);
    paredIzq.id = 'pared_izq';

    var paredDer = document.createElement('a-box');
    paredDer.setAttribute('height', data.alturaPared);
    paredDer.setAttribute('width', data.anchuraPared);
    paredDer.setAttribute('position', positionParedDer);
    paredDer.setAttribute('color', data.colorTablero);
    paredDer.id = 'pared_der';

    el.appendChild(suelo);
    el.appendChild(paredIzq);
    el.appendChild(paredDer);

    iniciaVariablesEntorno(data, positionIzq, positionDer, anchuraElegida);

    crearTablero(anchuraTablero, alturaTablero + 4);
    imprimeTablero();

  },
  tick: function() {
    var el = this.el;
    var entornoPiezas = document.getElementById("piezas");
    var suelo = document.getElementById('suelo');

    if (crearPieza) {
      imprimeTableroBool = true;
      eliminarFilasCompletas();
      crearPiezas(entornoPiezas, suelo);
    }

    if (rotarPiezas) {
      rotarPiezasFunction();
    }
  }
});


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

    var position = 0;
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

    el.appendChild(texto);
  },

  tick: function() {
    var el = this.el;

    el.addEventListener('grab-start', function(event) {
      rotarPiezas = true;
    });
  }
});



AFRAME.registerComponent('cubo', {
  schema: {
    position: {default: "0 0 0"},
    width: {default: "1"},
    height: {default: "1"},
    velocidad: {default: "0"},
    mixin: {default: ""}
  },

  init: function() {
    var el = this.el;
    var data = this.data;

    el.setAttribute('color', getRandomColor());
    el.setAttribute('position', data.position);
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);
    el.setAttribute('mixin', data.mixin);

    this.tocaSuelo = false;
    this.tocaParedDer = false;
    this.tocaParedIzq = false;
    this.bajarPieza = false;
    crearPieza = false;
  },

  tick: function() {
    var el = this.el;
    var data = this.data;

    el.addEventListener('grab-end', function(event) {
      var position = el.getAttribute('position');
      //el.removeAttribute('mixin');
      console.log("Posicion " + position.x + " " + position.y + " " + position.z);
    });
  }
});
