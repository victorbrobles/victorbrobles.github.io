
function moverControlador (data, el, id) {
  var positionFinal = el.getAttribute("position");

  var mando = document.getElementById("mando");
  var longitud = mando.getAttribute("width");
  var limiteX = longitud / 2;

  var positionZ = data.position.split(" ")[2];
  var positionAux = {x: positionFinal.x, y: positionFinal.y, z: positionZ};

  if (id == "controllertrasero") {
    var limitePositivo = limiteX;
    var limiteNegativo = -limiteX;
  } else {
    var limitePositivo = limiteX;
    var limiteNegativo = -limiteX;
  }

  if (positionFinal.x < limiteNegativo) {
    positionAux.x = limiteNegativo;
  }

  if (positionFinal.x > limitePositivo) {
    positionAux.x = limitePositivo;
  }

  el.setAttribute('position', positionAux);
}
