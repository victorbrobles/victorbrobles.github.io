
let llegaArriba = [];
let llegaDerecha = [];
let pararRebotador = [];
let contador = 0;

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function registrarRebotador(contador) {
  AFRAME.registerComponent('rebotador' + contador, {

    init: function() {
      llegaArriba[contador] = false;
      llegaDerecha[contador] = false;
      pararRebotador[contador] = false;
    },

    update: function() {
      var el = this.el;
      el.addEventListener('click', function() {
        pararRebotador[contador] = false;
      });
    },

    tick: function() {
      var el = this.el;
      var positionTmp = this.positionTmp = this.positionTmp || {x: 0, y: 2, z: -10};
      if (!pararRebotador[contador]) {
        var position = el.getAttribute("position");
        if (!llegaArriba[contador] && !llegaDerecha[contador]) {
          positionTmp.x = position.x + 0.05;
          positionTmp.y = position.y + 0.05;
          positionTmp.z = position.z;
        } else if (llegaArriba[contador] && !llegaDerecha[contador]){
          positionTmp.x = position.x + 0.05;
          positionTmp.y = position.y - 0.05;
          positionTmp.z = position.z;
        } else if (llegaArriba[contador] && llegaDerecha[contador]) {
          positionTmp.x = position.x - 0.05;
          positionTmp.y = position.y - 0.05;
          positionTmp.z = position.z;
        } else if (!llegaArriba[contador] && llegaDerecha[contador]) {
          positionTmp.x = position.x - 0.05;
          positionTmp.y = position.y + 0.05;
          positionTmp.z = position.z;
        }

        el.setAttribute('position', positionTmp);

        if (position.y >= 7) {
          llegaArriba[contador] = true;
          el.setAttribute('color', getRandomColor());
        }
        if (position.y <= -7) {
          llegaArriba[contador] = false;
          el.setAttribute('color', getRandomColor());
        }
        if (position.x >= 15.5) {
          llegaDerecha[contador] = true;
          el.setAttribute('color', getRandomColor());
        }
        if (position.x <= -15.5) {
          llegaDerecha[contador] = false;
          el.setAttribute('color', getRandomColor());
        }
      }
    }
  });
}

AFRAME.registerComponent('main_component', {

  init: function() {
    var scene = document.querySelector("a-scene");

    var entity = document.createElement ("a-entity");
    entity.setAttribute('cursor', 'rayOrigin:mouse');
    scene.appendChild(entity);

    var plano = document.createElement("a-plane");
    plano.setAttribute('position', {x:0, y:2, z:-10});
    plano.setAttribute('color', "black");
    plano.setAttribute('width', 32);
    plano.setAttribute('height', 15);

    entity.appendChild(plano);

    var boton = document.createElement("a-box");
    boton.setAttribute('position', {x:0, y:-6, z:-10});
    boton.setAttribute('color', "red");
    boton.setAttribute('width', 3);
    boton.setAttribute('height', 1);
    boton.setAttribute('depth', 0);
    entity.appendChild(boton);

    var texto = document.createElement("a-text");
    texto.setAttribute('value', "Parar rebotadores");
    texto.setAttribute('align', 'center');
    boton.appendChild(texto);
  },

  update: function() {

    var plano = document.querySelector("a-plane");
    plano.addEventListener('click', function () {
      var rebotador = document.createElement("a-circle");
      rebotador.setAttribute('color', "white");
      rebotador.setAttribute('position', {x:0, y:0, z:0});
      rebotador.setAttribute('radius', 0.5);
      rebotador.setAttribute ('rebotador' + contador);
      registrarRebotador(contador);
      plano.appendChild(rebotador);

      contador += 1;

    });

    var boton = document.querySelector("a-box");
    boton.addEventListener('click', function() {
      var listaRebotadores = document.querySelectorAll("a-circle");
      for (var k=0; k<listaRebotadores.length; k++) {
        pararRebotador[k] = true;
      }
    });
  },
});
