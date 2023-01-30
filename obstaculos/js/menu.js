
let fuenteBoton = "https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/specialelite/SpecialElite-Regular.json";

let maxY = 0;
let minY = 0;

let subir = false;
let bajar = true;

let botonPulsado = false;
let idPulsado = "";

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
    minY = positionY - 0.5;

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

    if (botonPulsado) {
      botonPulsado = false;
      if (idPulsado == "opcion1") {
        location.replace("obstaculos.html?obs=5");
      } else if (idPulsado == "opcion2") {
        location.replace("obstaculos.html?obs=10");
      } else if (idPulsado == "opcion3") {
        location.replace("obstaculos.html?obs=15");
      } else if (idPulsado == "opcion4") {
        location.replace("obstaculos.html?obs=20");
      }
    }

    el.addEventListener('grab-end', function(event) {
      event.stopImmediatePropagation();
      botonPulsado = true;
      idPulsado = el.getAttribute('id');
    });
  }
});


AFRAME.registerComponent('botonback', {
  schema: {
    position: {default: "0 0 0"},
    rotation: {default: "0 0 0"},
    width: {default: "1"},
    height: {default: "1"},
    color: {default: "white"},
    text: {default: ""}
  },

  init: function() {

    var el = this.el;
    var data = this.data;

    el.setAttribute('color', data.color);
    el.setAttribute('position', data.position);
    el.setAttribute('rotation', data.rotation);
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);
    el.setAttribute('depth', 0);
    el.classList.add('botonBack');

    var text = document.createElement('a-entity');
    text.setAttribute('position', "1.4 -1.1 1");
    text.setAttribute('text', "value: " + data.text + "; width: 15; height: 20; align: center; color: #FFFFFF; shader: msdf; font: " + fuenteBoton);

    el.appendChild(text);
  },
  tick: function() {
    var el = this.el;
    var data = this.data;

    el.addEventListener('grab-end', function(event) {
      event.stopImmediatePropagation();
      location.replace("../menuDesktop.html");
    });
  }
});
