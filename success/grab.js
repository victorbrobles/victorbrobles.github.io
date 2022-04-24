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

      console.log("Empieza grab");
      //var positionMano = event.detail.hand.getAttribute("position");
      el.setAttribute('color', getRandomColor());

    });

    el.addEventListener('grab-end', function(event) {

      console.log("Termina grab");
      el.setAttribute('geometry', "sphere");
      el.setAttribute('color', "yellow");

    });
  }
});
