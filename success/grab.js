function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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

      el.setAttribute('color', getRandomColor());

      texto = document.getElementById("message");
      texto.setAttribute('value', event.detail.hand.getAttribute("position"));
    })

    el.addEventListener('grab-end', function() {
      el.setAttribute('color', "black");
    })
  }
});
