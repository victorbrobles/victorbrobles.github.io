
let buttonFont = "https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/specialelite/SpecialElite-Regular.json";

let maxY = 0;
let minY = 0;

let goUp = false;
let goDown = true;

let pressedButton = false;
let pressedId = "";

AFRAME.registerComponent('boton', {
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
    el.classList.add('boton');

    var positionY = data.position.split(" ")[1];

    maxY = positionY;
    minY = positionY - 1;

    var text = document.createElement('a-entity');

    var id = el.getAttribute('id');

    if (id == "colors") {
      text.setAttribute('position', "0 -0.4 1");
    } else if (id == "desktop" || id == "standard" || id == "multiboard" || id == "3dimensional") {
      text.setAttribute('position', "0.5 -0.4 1");
    } else {
      text.setAttribute('position', "-0.5 -0.4 1");
    }
    text.setAttribute('text', "value: " + data.text + "; width: 15; height: 20; align: center; color: #FFFFFF; shader: msdf; font: " + buttonFont);

    el.appendChild(text);
  },
  tick: function() {
    var el = this.el;
    var data = this.data;

    var position = el.getAttribute('position');

    if (goDown) {
      if (position.y > minY) {
        el.setAttribute('position', {x:position.x, y:position.y - 0.005, z:position.z});
      } else {
        goDown = false;
        goUp = true;
      }
    }

    if (goUp) {
      if (position.y < maxY) {
        el.setAttribute('position', {x:position.x, y:position.y + 0.005, z:position.z});
      } else {
        goDown = true;
        goUp = false;
      }
    }

    if (pressedButton) {
      pressedButton = false;
      if (pressedId == "desktop") {
        location.replace("menuDesktop.html");
      } else if (pressedId == "vr") {
        location.replace("menuVr.html");
      } else if (pressedId == "standard") {
        location.replace("estandar/eleccion.html");
      } else if (pressedId == "multiboard") {
        location.replace("multiples/multiples.html");
      } else if (pressedId == "colors") {
        location.replace("colores/eleccion.html");
      } else if (pressedId == "obstacles") {
        location.replace("obstaculos/menu.html");
      } else if (pressedId == "3dimensional") {
        location.replace("3dimensional/eleccion.html");
      } else if (pressedId == "reactiontest") {
        location.replace("reaction/eleccion.html");
      } else if (pressedId == "drop") {
        location.replace("drop/eleccion.html");
      }
    }

    el.addEventListener('grab-end', function(event) {
      event.stopImmediatePropagation();
      pressedButton = true;
      pressedId = el.getAttribute('id');
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
    text.setAttribute('text', "value: " + data.text + "; width: 15; height: 20; align: center; color: #FFFFFF; shader: msdf; font: " + buttonFont);

    el.appendChild(text);
  },
  tick: function() {
    var el = this.el;
    var data = this.data;

    el.addEventListener('grab-end', function(event) {
      event.stopImmediatePropagation();
      location.replace("menuPrincipal.html");
    });
  }
});
