function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function nuevaPosicion(cubo, mano) {
  if (mano > cubo) {
    return mano + cubo;
  } else if (mano < cubo) {
    if (mano < 0) {
      return mano + cubo;
    } else {
      return cubo - mano;
    }
  } else {
    return cubo;
  }
}


AFRAME.registerComponent('cubo', {

  init: function() {
    var el = this.el;

    el.addEventListener('grab-start', function(event) {

      var position = el.getAttribute("position");

      console.log("Cubo " + position.x + " | " + position.y + " | " + position.z);

      var positionMano = event.detail.hand.getAttribute("position");

      console.log("Mano " + positionMano.x + " | " + positionMano.y + " | " + positionMano.z);

      var positionTmp = this.positionTmp = this.positionTmp || {x: 0, y: 2, z: -10};

      positionTmp.x = positionMano.x;
      positionTmp.y = positionMano.y;
      positionTmp.z = position.z;

      el.setAttribute('position', positionTmp);

      var position2 = el.getAttribute("position");

      console.log("CuboFinal " + position2.x + " | " + position2.y + " | " + position2.z);

      el.setAttribute('color', getRandomColor());
    });
  }
});
