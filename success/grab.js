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

      console.log("Cubo x " + position.x);
      console.log("Cubo y " + position.y);
      console.log("Cubo z " + position.z);

      var positionMano = event.detail.hand.getAttribute("position");

      console.log("Mano x " + positionMano.x);
      console.log("Mano x " + positionMano.y);
      console.log("Mano x " + positionMano.z);

      var positionTmp = this.positionTmp = this.positionTmp || {x: 0, y: 2, z: -10};

      positionTmp.x = nuevaPosicion(position.x, positionMano.x);
      positionTmp.y = nuevaPosicion(position.y, positionMano.y);
      positionTmp.z = position.z;

      el.setAttribute('position', positionTmp);

      var position2 = el.getAttribute("position");

      console.log("CuboF x " + position2.x);
      console.log("CuboF y " + position2.y);
      console.log("CuboF z " + position2.z);

      el.setAttribute('color', getRandomColor());

      texto = document.getElementById("message");
      texto.setAttribute('value', event.detail.hand.getAttribute("position"));
    })

    el.addEventListener('grab-end', function() {
      el.setAttribute('color', "black");
    })
  }
});
