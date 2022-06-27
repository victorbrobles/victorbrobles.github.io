
let fuenteBoton = "https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/specialelite/SpecialElite-Regular.json";

let maxY = 0;
let minY = 0;

let subir = false;
let bajar = true;

AFRAME.registerComponent('boton', {
  schema: {
    position: {default: "0 0 0"},
    rotation: {default: "0 0 0"},
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
    el.setAttribute('rotation', data.rotation);
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);
    el.classList.add('boton');

    var positionY = data.position.split(" ")[1];

    maxY = positionY;
    minY = positionY - 1;

    var texto = document.createElement('a-entity');

    var id = el.getAttribute('id');

    if (id == "opcion1" || id == "opcion2") {
      texto.setAttribute('position', "0.5 -0.4 1");
    } else {
      texto.setAttribute('position', "-0.5 -0.4 1");
    }
    texto.setAttribute('text', "value: " + data.texto + "; width: 15; height: 20; align: center; color: #FFFFFF; shader: msdf; font: " + fuenteBoton);

    el.appendChild(texto);
  },
  tick: function() {
    var el = this.el;
    var data = this.data;

    var position = el.getAttribute('position');

    if (bajar) {
      if (position.y > minY) {
        el.setAttribute('position', {x:position.x, y:position.y - 0.005, z:position.z});
      } else {
        bajar = false;
        subir = true;
      }
    }

    if (subir) {
      if (position.y < maxY) {
        el.setAttribute('position', {x:position.x, y:position.y + 0.005, z:position.z});
      } else {
        bajar = true;
        subir = false;
      }
    }

    el.addEventListener('grab-start', function(event) {

      var id = el.getAttribute('id');
      console.log("Id: " + id);

      if (id == "opcion1") {
        location.replace("demo.html");
      }
    });
  }
});
