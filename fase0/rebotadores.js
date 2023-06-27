let llegaArriba = [];
let llegaDerecha = [];
let pararRebotador = [];
let contador = 0;

let wall1 = "position: -15.5 2 -10; color:black; width:1; height:15";
let wall2 = "position: 15.5 2 -10; color:black; width:1; height:15";
let wall3 = "position: 0 9 -10; color:black; width:32; height:1";
let wall4 = "position: 0 -5 -10; color:black; width:32; height:1";

let walls = [wall1, wall2, wall3, wall4];

let hole1 = "position: -15.5 9 -10; color:#9b9b9b; width:1; height:1";
let hole2 = "position: -15.5 -5 -10; color:#9b9b9b; width:1; height:1";
let hole3 = "position: 15.5 9 -10; color:#9b9b9b; width:1; height:1";
let hole4 = "position: 15.5 -5 -10; color:#9b9b9b; width:1; height:1";
let hole5 = "position: 0 9 -10; color:#9b9b9b; width:1; height:1";
let hole6 = "position: 0 -5 -10; color:#9b9b9b; width:1; height:1";

let holes = [hole1, hole2, hole3, hole4, hole5, hole6];




function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


AFRAME.registerComponent('main_component', {

  init: function() {
    var scene = document.querySelector("a-scene");

    var entity = document.createElement ("a-entity");
    entity.setAttribute('cursor', 'rayOrigin:mouse');
    scene.appendChild(entity);

    var plane = document.createElement("a-plane");
    plane.setAttribute('main-plane', "position: 0 2 -10; color:#35682d; width:32; height:15");
    entity.appendChild(plane);

    for (let i=0; i<walls.length; i++) {
      var plane = document.createElement("a-plane");
      plane.setAttribute('wall', walls[i]);
      entity.appendChild(plane);
    }

    for (let i=0; i<holes.length; i++) {
      var plane = document.createElement("a-plane");
      plane.setAttribute('hole', holes[i]);
      entity.appendChild(plane);
    }

    var boton = document.createElement("a-box");
    boton.setAttribute('boton',"");
    entity.appendChild(boton);
  }
});

AFRAME.registerComponent('main-plane', {
  schema: {
    position: {default: "0 0 0"},
    color: {default: "black"},
    width: {default: 0},
    height: {default: 0}
  },

  init: function () {
    var el = this.el;
    var data = this.data;

    el.setAttribute('position', data.position);
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);
    el.setAttribute('color', data.color);
  },

  update: function() {

    var el = this.el;
    var data = this.data;

    el.addEventListener('click', function () {
      var rebotador = document.createElement("a-circle");
      var rebotador_props = "color:white; position:0 0 0; radius: 0.5; contador:" + contador;
      rebotador.setAttribute ('rebotador', rebotador_props);
      el.appendChild(rebotador);

      contador += 1;

    });
  },

  tick: function() {
    var listaRebotadores = document.querySelectorAll("a-circle");
    for (let i=0; i<listaRebotadores.length; i++) {
      var rebotador = listaRebotadores[i];
      var position = rebotador.getAttribute("position");

      if (position.y >= 6) {
        llegaArriba[i] = true;
        rebotador.setAttribute('color', getRandomColor());
      }
      if (position.y <= -6) {
        llegaArriba[i] = false;
        rebotador.setAttribute('color', getRandomColor());
      }
      if (position.x >= 14.5) {
        llegaDerecha[i] = true;
        rebotador.setAttribute('color', getRandomColor());
      }
      if (position.x <= -14.5) {
        llegaDerecha[i] = false;
        rebotador.setAttribute('color', getRandomColor());
      }
    }
  }
});

AFRAME.registerComponent('hole', {
  schema: {
    position: {default: "0 0 0"},
    color: {default: "red"},
    width: {default: 0},
    height: {default: 0}
  },

  init: function () {
    var el = this.el;
    var data = this.data;

    el.setAttribute('position', data.position);
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);
    el.setAttribute('color', data.color);
  }
});

AFRAME.registerComponent('wall', {
  schema: {
    position: {default: "0 0 0"},
    color: {default: "red"},
    width: {default: 0},
    height: {default: 0}
  },

  init: function () {
    var el = this.el;
    var data = this.data;

    el.setAttribute('position', data.position);
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);
    el.setAttribute('color', data.color);
  }
});

  AFRAME.registerComponent('boton', {

    init: function () {
      var el = this.el;
      var data = this.data;

      el.setAttribute('position', {x:0, y:-6, z:-10});
      el.setAttribute('color', "red");
      el.setAttribute('width', 3);
      el.setAttribute('height', 1);
      el.setAttribute('depth', 0);

      var texto = document.createElement("a-text");
      texto.setAttribute('value', "Parar rebotadores");
      texto.setAttribute('align', 'center');
      el.appendChild(texto);
    },

    update: function () {
      var el = this.el;
      var data = this.data;

      el.addEventListener('click', function() {
        var listaRebotadores = document.querySelectorAll("a-circle");
        for (var k=0; k<listaRebotadores.length; k++) {
          pararRebotador[k] = true;
        }
      });
    }
});

AFRAME.registerComponent('rebotador', {
  schema: {
    position: {default: "0 0 0"},
    color: {default: "white"},
    radius: {default: 0.5},
    contador: {default: 0}
  },

  init: function () {

    var el = this.el;
    var data = this.data;

    llegaArriba[data.contador] = false;
    llegaDerecha[data.contador] = false;
    pararRebotador[data.contador] = false;

    el.setAttribute('position', data.position);
    el.setAttribute('color', data.color);
    el.setAttribute('radius', data.radius);
  },

  update: function() {
    var el = this.el;
    var data = this.data;

    el.addEventListener('click', function() {
      console.log("rebotador " + data.contador);
      pararRebotador[data.contador] = false;
    });
  },

  tick: function() {

    var el = this.el;
    var data = this.data;

    var positionTmp = this.positionTmp = this.positionTmp || {x: 0, y: 2, z: -10};
    if (!pararRebotador[data.contador]) {
      var position = el.getAttribute("position");
      if (!llegaArriba[data.contador] && !llegaDerecha[data.contador]) {
        positionTmp.x = position.x + 0.05;
        positionTmp.y = position.y + 0.05;
        positionTmp.z = position.z;
      } else if (llegaArriba[data.contador] && !llegaDerecha[data.contador]){
        positionTmp.x = position.x + 0.05;
        positionTmp.y = position.y - 0.05;
        positionTmp.z = position.z;
      } else if (llegaArriba[data.contador] && llegaDerecha[data.contador]) {
        positionTmp.x = position.x - 0.05;
        positionTmp.y = position.y - 0.05;
        positionTmp.z = position.z;
      } else if (!llegaArriba[data.contador] && llegaDerecha[data.contador]) {
        positionTmp.x = position.x - 0.05;
        positionTmp.y = position.y + 0.05;
        positionTmp.z = position.z;
      }

      el.setAttribute('position', positionTmp);
    }
  }
});


function nums_random (min, max) {
  if (max>=0 && min>=0) {
    return Math.floor((Math.random()*(max-min+1) + min));
  } else if (max<0 && min<0) {
    min = -min;
    max = -max;
    return -(Math.floor((Math.random()*(max-min+1) + min)));
  } else if (max>=0 && min<0) {
    min = -min;
    return Math.floor((Math.random()*(max+min+1) - min));
  } else {
    return 0;
  }
}
