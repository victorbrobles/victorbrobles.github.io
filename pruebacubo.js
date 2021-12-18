

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
    var el = thsis.el;

    el.addEventListener('grab-start', function() {
      el.setAttribute('color', getRandomColor());
    })
  }
});
