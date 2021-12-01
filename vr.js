
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


AFRAME.registerComponent('cubo', {

  update: function () {
    var el = this.el;
    var data = this.data;

    el.addEventListener('abuttondown', function () {
      el.setAttribute ('color', getRandomColor());
    });
    
  }

});
