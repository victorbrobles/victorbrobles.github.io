
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
    } else if (restarPuntosBool) {
      restarPuntos(data);
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
      contadorPieza += 1;

      eliminarFilasCompletas();
      crearPiezaFunction(entornoPiezas, suelo);
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
    this.primerTick = true;
    this.contadorTiempo = 0;
    this.tiempoExpirado = false;
    this.bajarPieza = false;
    crearPieza = false;
  },

  tick: function() {
    var el = this.el;
    var data = this.data;

    var idPieza = el.getAttribute('id');
    var numPieza = idPieza.split("cubo")[1];

    if (numPieza == contadorPieza) {
      if (this.primerTick) {
        this.contadorTiempo = Date.now();
        this.primerTick = false;
      }

      var tiempoComparar = Date.now();

      if (tiempoComparar >= this.contadorTiempo + 5000) {
        this.tiempoExpirado = true;
      }

      el.addEventListener('grab-end', function(event) {
        event.stopImmediatePropagation();
        el.components.cubo.bajarPieza = true;
      });

      if (this.tiempoExpirado) {
        var entornoPiezas = document.getElementById("piezas");
        entornoPiezas.removeChild(el);
        crearPieza = true;

        piezasSaltadas++;
        restarPuntosBool = true;

        if (piezasSaltadas == 10) {
          location.replace("../gameover.html?puntuacion=" + scoreActual);
        }
      }

      //console.log("this.bajarPieza " + this.bajarPieza);

      if (this.bajarPieza) {
        var position = el.getAttribute('position');
        var alturaPieza = el.getAttribute('height');
        var anchuraPieza = el.getAttribute('width');
        var positionTmp = {x: position.x, y: position.y - data.velocidad, z: position.z};

        var posX = dameCoordenadaX(position.x, anchuraPieza);
        var posY = dameCoordenadaY(position.y, alturaPieza);

        revisaPosicionHorizontalPieza(el, position, alturaPieza, anchuraPieza);
        revisaPosicionVerticalPieza(el, posX, posY, alturaPieza, anchuraPieza);

        if (!this.tocaSuelo) {
          if (el != null) {
            el.setAttribute('position', positionTmp);
          }
        } else {
          if (imprimeTableroBool) {
            actualizaTablero(posX,posY,anchuraPieza,alturaPieza, contadorPieza);
            imprimeTableroBool = false;
          }

          actualizaMarcadorPieza = true;

          if (!isGameOver()) {
            crearPieza = true;
          } else {
            location.replace("../gameover.html?puntuacion=" + scoreActual);
          }
        }
      }
    }
  }
});
