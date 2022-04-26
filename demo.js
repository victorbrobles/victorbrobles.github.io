function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


//Proximo dia: crear tablero tetris, boton girar pieza a un lado, y hacer que una pieza vaya cayendo y tu la puedas mover solo para el lado o para abajo.
//Cuando la pieza sobrepase el tablero por el lado deberá quedarse en el tablero.


// CREACIÓN DEL TABLERO

AFRAME.registerComponent('suelo', {
  schema: {
    position: {default: "0 0 0"},
    width: {default: 0},
    height: {default: 0}
  },

  init: function() {
    var el = this.el;
    var data = this.data;

    var pared = document.createElement("a-box");
    pared.setAttribute('position', data.position);
    pared.setAttribute('color', "black");
    pared.setAttribute('width', data.width);
    pared.setAttribute('height', data.height);

    el.appendChild(pared);
  }
});

AFRAME.registerComponent('pared_izq', {
  schema: {
    position: {default: "0 0 0"},
    width: {default: 0},
    height: {default: 0}
  },

  init: function() {
    var el = this.el;
    var data = this.data;

    var pared = document.createElement("a-box");
    pared.setAttribute('position', data.position);
    pared.setAttribute('color', "black");
    pared.setAttribute('width', data.width);
    pared.setAttribute('height', data.height);

    el.appendChild(pared);
  }
});

AFRAME.registerComponent('pared_der', {
  schema: {
    position: {default: "0 0 0"},
    width: {default: 0},
    height: {default: 0}
  },

  init: function() {
    var el = this.el;
    var data = this.data;

    var pared = document.createElement("a-box");
    pared.setAttribute('position', data.position);
    pared.setAttribute('color', "black");
    pared.setAttribute('width', data.width);
    pared.setAttribute('height', data.height);

    el.appendChild(pared);
  }
});


//Piezas del tetris

//límite x -> 4 y -4

AFRAME.registerComponent('cubo', {
  schema: {
    position: {default: "0 0 0"},
  },

  init: function() {
    var el = this.el;
    var data = this.data;

    el.setAttribute('color', getRandomColor());
    el.setAttribute('position', data.position);
  },

  tick: function() {
    var el = this.el;

    var position = el.getAttribute("position");

    if (position.y > 1) {
      var positionTmp = this.positionTmp = this.positionTmp || {x: 0, y: 2, z: -10};
      positionTmp.x = position.x;
      positionTmp.y = position.y - 0.005;
      positionTmp.z = position.z;

      el.setAttribute('position', positionTmp);
    }
  }

});
