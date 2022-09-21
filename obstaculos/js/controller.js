
function moverControlador (controller, data, el) {
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
}
