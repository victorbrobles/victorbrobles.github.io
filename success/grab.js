function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


AFRAME.registerComponent('escena', {

  init: function() {
    var el = this.el;

    el.addEventListener('grab-start', function(event) {

      var cubo = document.getElementById("cubo1");
      var position = cubo.getAttribute("position");

      console.log("ESC Cubo x " + position.x);
      console.log("ESC Cubo y " + position.y);
      console.log("ESC Cubo z " + position.z);

      var positionMano = event.detail.hand.getAttribute("position");

      console.log("ESC Mano x " + positionMano.x);
      console.log("ESC Mano x " + positionMano.y);
      console.log("ESC Mano x " + positionMano.z);

      var positionTmp = this.positionTmp = this.positionTmp || {x: 0, y: 2, z: -10};

      positionTmp.x = position.x + positionMano.x;
      positionTmp.y = position.y + positionMano.y;
      positionTmp.z = position.z;

      el.setAttribute('position', positionTmp);

      var position2 = el.getAttribute("position");

      console.log("ESC CuboF x " + position2.x);
      console.log("ESC CuboF y " + position2.y);
      console.log("ESC CuboF z " + position2.z);

      cubo.setAttribute('color', getRandomColor());
    })
  }
});


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

      positionTmp.x = position.x + positionMano.x;
      positionTmp.y = position.y + positionMano.y;
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
