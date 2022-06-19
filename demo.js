
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

//Inicialización del controlador
let posController = {x: 0, y: 0, z: 0};

//Variable de nueva posición pieza
let nuevaPos = "";

//Tablero
var tablero = [];



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

    el.setAttribute('position', data.position);
    el.setAttribute('color', "black");
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);
    el.id = 'suelo';

    //Creamos pieza

    var entorno = document.getElementById("entorno");
    var pieza = document.createElement("a-box");

    pieza.classList.add("cubo");
    pieza.id = "cubo";
    pieza.setAttribute('cubo', damePropsPieza())

    entorno.appendChild(pieza);

  },
  tick: function() {
    var el = this.el;
    var data = this.data;

    var pieza = document.getElementById("cubo");
    var position = pieza.getAttribute('position');
    var alturaPieza = pieza.getAttribute('height');
    var positionSuelo = el.getAttribute('position');

    alturaSuelo = (data.height/2) + positionSuelo.y;

    if (position.y <= alturaSuelo + (alturaPieza/2)) {
      piezaTocaSuelo = true;
    } else {
      piezaTocaSuelo = false;
    }

    if (tablero.length == 0) {
      crearTablero ();
    }
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

    el.setAttribute('position', data.position);
    el.setAttribute('color', "black");
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);
    el.id = 'pared_izq';
  },

  tick: function() {
    var el = this.el;
    var data = this.data;

    var pieza = document.getElementById("cubo");
    var position = pieza.getAttribute('position');
    var anchuraPieza = pieza.getAttribute('width');
    var positionPared = el.getAttribute('position');

    limiteIzq = (positionPared.x + data.width/2);

    if (position.x <= limiteIzq + anchuraPieza/2) {
      piezaTocaParedIzq = true;
    } else {
      piezaTocaParedIzq = false;
    }
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

    el.setAttribute('position', data.position);
    el.setAttribute('color', "black");
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);
    el.id = 'pared_der';

  },

  tick: function() {
    var el = this.el;
    var data = this.data;

    var pieza = document.getElementById("cubo");
    var position = pieza.getAttribute('position');
    var anchuraPieza = pieza.getAttribute('width');
    var positionPared = el.getAttribute('position');

    limiteDer = (positionPared.x - data.width/2);

    if (position.x >= limiteDer - anchuraPieza/2) {
      piezaTocaParedDer = true;
    } else {
      piezaTocaParedDer = false;
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
  },

  tick: function() {
    var el = this.el;
    var data = this.data;

    var position = el.getAttribute("position");
    var width = el.getAttribute('width');
    var height = el.getAttribute('height');
    var perimetro = limiteDer - limiteIzq;

    if (!piezaTocaSuelo) {

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
  }
});
