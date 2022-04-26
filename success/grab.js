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
      el.setAttribute('geometry', "primitive: sphere; radius: 0.75");
      el.setAttribute('color', "black");

    });

    el.addEventListener('onclick', function(event) {
      console.log("Click en el cubo");
    });
  }
});
