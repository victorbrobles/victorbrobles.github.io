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

      console.log("He clickado el cubo");
      console.log("Componente " + el.outerHTML);
      console.log("Mano " + event.detail.hand.outerHTML);

      el.setAttribute('color', getRandomColor());

      texto = document.getElementById("message");
      texto.setAttribute('value', event.detail.hand.getAttribute("position"));
    })

    el.addEventListener('grab-end', function() {
      el.setAttribute('color', "black");
    })
  }
});
