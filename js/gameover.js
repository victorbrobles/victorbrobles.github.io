let fuenteBoton = "https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/specialelite/SpecialElite-Regular.json";
let fuenteScore = "https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/snippet/Snippet.json";

let minX = 0;
let maxX = 0;

let derecha = false;
let izquierda = false;

let volverMenu = false;


var URLsearch = window.location.search;
console.log(URLsearch);

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

    var puntuacion = window.location.search;
    var score = puntuacion.split("=")[1];

    var texto = document.createElement("a-entity");
    texto.id = "valorscore";
    texto.setAttribute('position', "0 0 1");
    texto.setAttribute('text', "value:PUNTUACION FINAL: " + score + "; width: " + data.anchuraTexto + "; height: " + data.alturaTexto + "; align: center; color: black; shader: msdf; font: " + fuenteScore);

    el.appendChild(texto);
  }
});

AFRAME.registerComponent('boton', {
  schema: {
    position: {default: "0 0 0"},
    width: {default: "1"},
    height: {default: "1"},
    color: {default: "white"},
    texto: {default: ""}
  },

  init: function() {

    var el = this.el;
    var data = this.data;

    el.setAttribute('color', data.color);
    el.setAttribute('position', data.position);
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);
    el.classList.add('boton');

    var positionX = data.position.split(" ")[0];

    maxX = positionX + 6;
    minX = positionX - 6;

    var texto = document.createElement('a-entity');

    texto.setAttribute('position', "0 -0.5 1");
    texto.setAttribute('text', "value: " + data.texto + "; width: 15; height: 20; align: center; color: white; shader: msdf; font: " + fuenteBoton);

    el.appendChild(texto);
  },
  tick: function() {
    var el = this.el;
    var data = this.data;

    var position = el.getAttribute('position');

    if (izquierda) {
      if (position.x > minX) {
        el.setAttribute('position', {x:position.x - 0.005, y:position.y, z:position.z});
      } else {
        izquierda = false;
        derecha = true;
      }
    }

    if (derecha) {
      if (position.x < maxX) {
        el.setAttribute('position', {x:position.x + 0.005, y:position.y, z:position.z});
      } else {
        izquierda = true;
        derecha = false;
      }
    }

    if (volverMenu) {
      volverMenu = false;
      location.replace("menuPrincipal.html");
    }

    el.addEventListener('grab-end', function(event) {
      volverMenu = true;
    });
  }
});
