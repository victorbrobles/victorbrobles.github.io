
function nums_random (min, max) {
  if (max>=0 && min>=0) {
    return Math.floor((Math.random()*(max-min+1) + min));
  } else if (max<0 && min<0) {
    min = -min;
    max = -max;
    return -(Math.floor((Math.random()*(max-min+1) + min)));
  } else if (max>=0 && min<0) {
    min = -min;
    return Math.floor((Math.random()*(max+min+1) - min));
  } else {
    return 0;
  }
}

AFRAME.registerComponent('main_component', {

  init: function() {
    var scene = document.querySelector("a-scene");

    //Entidad 1

    var entity1 = document.createElement ("a-entity");
    //entity1.setAttribute('cursor', 'rayOrigin:mouse');
    entity1.setAttribute('oculus-touch-controls', 'hand: left');
    entity1.setAttribute('oculus-touch-controls', 'hand: right');
    scene.appendChild(entity1);

    var plano1 = document.createElement ("a-plane");
    plano1.id = "plano1";
    plano1.setAttribute('position', {x:-8, y:5, z:-10});
    plano1.setAttribute('width', 16);
    plano1.setAttribute('height', 8);
    plano1.setAttribute('color', "#0a0a0a");

    var box1 = document.createElement ("a-box");
    box1.id = "box1";
    box1.setAttribute('position', {x:-8, y:5, z:-10});
    box1.setAttribute('color', "red");

    entity1.appendChild(plano1);
    entity1.appendChild(box1);

    //Entidad 2

    var entity2 = document.createElement ("a-entity");
    //entity2.setAttribute('cursor', 'rayOrigin:mouse');
    entity2.setAttribute('oculus-touch-controls', 'hand: left');
    entity2.setAttribute('oculus-touch-controls', 'hand: right');
    scene.appendChild(entity2);

    var plano2 = document.createElement ("a-plane");
    plano2.id = "plano2";
    plano2.setAttribute('position', {x:-8, y:-3, z:-10});
    plano2.setAttribute('width', 16);
    plano2.setAttribute('height', 8);
    plano2.setAttribute('color', "#aba5a3");

    var box2 = document.createElement ("a-box");
    box2.id = "box2";
    box2.setAttribute('position', {x:-8, y:-3, z:-10});
    box2.setAttribute('color', "blue");

    entity2.appendChild(plano2);
    entity2.appendChild(box2);

    //Entidad 3

    var entity3 = document.createElement ("a-entity");
    //entity3.setAttribute('cursor', 'rayOrigin:mouse');
    entity3.setAttribute('oculus-touch-controls', 'hand: left');
    entity3.setAttribute('oculus-touch-controls', 'hand: right');
    scene.appendChild(entity3);

    var plano3 = document.createElement ("a-plane");
    plano3.id = "plano3";
    plano3.setAttribute('position', {x:8, y:5, z:-10});
    plano3.setAttribute('width', 16);
    plano3.setAttribute('height', 8);
    plano3.setAttribute('color', "#aba5a3");

    var box3 = document.createElement ("a-box");
    box3.id = "box3";
    box3.setAttribute('position', {x:8, y:5, z:-10});
    box3.setAttribute('color', "green");

    entity3.appendChild(plano3);
    entity3.appendChild(box3);

    //Entidad 4

    var entity4 = document.createElement ("a-entity");
    //entity4.setAttribute('cursor', 'rayOrigin:mouse');
    entity4.setAttribute('oculus-touch-controls', 'hand: left');
    entity4.setAttribute('oculus-touch-controls', 'hand: right');
    scene.appendChild(entity4);

    var plano4 = document.createElement ("a-plane");
    plano4.id = "plano4";
    plano4.setAttribute('position', {x:8, y:-3, z:-10});
    plano4.setAttribute('width', 16);
    plano4.setAttribute('height', 8);
    plano4.setAttribute('color', "#0a0a0a");

    var box4 = document.createElement ("a-box");
    box4.id = "box4";
    box4.setAttribute('position', {x:8, y:-3, z:-10});
    box4.setAttribute('color', "orange");

    entity4.appendChild(plano4);
    entity4.appendChild(box4);

  },

  update: function() {

    var colors1 = ["#632f4f", "#8c3c5d", "#c75874", "#ff8b95", "#ffcbb7"];
    var box1 = document.getElementById("box1");

    //box1.addEventListener('click', function () {
    box1.addEventListener('abuttondown', function () {
      box1.setAttribute('color', colors1[Math.floor(Math.random()*colors1.length)]);
    });

    var colors2 = ["#00134c", "#0f2d8b", "#009ffa", "#00fdff", "#cfffff"];
    var box2 = document.getElementById("box2");

    //box2.addEventListener('click', function () {
    box2.addEventListener('abuttondown', function () {
      box2.setAttribute('color', colors2[Math.floor(Math.random()*colors2.length)]);
    });

    var colors3 = ["#03fab7", "#03fd6e", "#c8ff53", "#fffb74", "#fffb9e"];
    var box3 = document.getElementById("box3");

    //box3.addEventListener('click', function () {
    box3.addEventListener('abuttondown', function () {
      box3.setAttribute('color', colors3[Math.floor(Math.random()*colors3.length)]);
    });

    var colors4 = ["#5c2738", "#7d3946", "#ae5a57", "#ea866e", "#f1bd7b"];
    var box4 = document.getElementById("box4");

    //box4.addEventListener('click', function () {
    box4.addEventListener('abuttondown', function () {
      box4.setAttribute('color', colors4[Math.floor(Math.random()*colors4.length)]);
    });

    var colors5 = ["#0a0a0a", "#5e544f"];
    var plano1 = document.getElementById("plano1");

    //plano1.addEventListener('click', function () {
    plano1.addEventListener('abuttondown', function () {
      plano1.setAttribute('color', colors5[Math.floor(Math.random()*colors5.length)]);
      box1.setAttribute('position', {x:nums_random(-1,-15), y:nums_random(2,8), z:-10});
    });

    var colors6 = ["#aba5a3", "#f8f8ff"];
    var plano2 = document.getElementById("plano2");

    //plano2.addEventListener('click', function () {
    plano2.addEventListener('abuttondown', function () {
      plano2.setAttribute('color', colors6[Math.floor(Math.random()*colors6.length)]);
      box2.setAttribute('position', {x:nums_random(-1,-15), y:nums_random(-6,0), z:-10});
    });

    var plano3 = document.getElementById("plano3");

    //plano3.addEventListener('click', function () {
    plano3.addEventListener('abuttondown', function () {
      plano3.setAttribute('color', colors6[Math.floor(Math.random()*colors6.length)]);
      box3.setAttribute('position', {x:nums_random(1,15), y:nums_random(2,8), z:-10});
    });

    var plano4 = document.getElementById("plano4");

    //plano4.addEventListener('click', function () {
    plano4.addEventListener('abuttondown', function () {
      plano4.setAttribute('color', colors5[Math.floor(Math.random()*colors5.length)]);
      box4.setAttribute('position', {x:nums_random(1,15), y:nums_random(-6,0), z:-10});
    });

  }
});
