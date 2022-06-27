let fuenteBoton = "https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/specialelite/SpecialElite-Regular.json";

let minX = 0;
let maxX = 0;

let derecha = false;
let izquierda = false;

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
    texto.setAttribute('text', "value: " + data.texto + "; width: 15; height: 20; align: center; color: black; shader: msdf; font: " + fuenteBoton);

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

    el.addEventListener('grab-start', function(event) {
        location.replace("menu.html");
    });
  }
});
