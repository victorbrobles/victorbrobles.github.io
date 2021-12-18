
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


let entity = "";
let plane = "";
let box = "";
let position_plane = [];

let limit_x_max = "";
let limit_x_min = "";
let limit_y_max = "";
let limit_y_min = "";

let color_boxes_1 = ["#632f4f", "#8c3c5d", "#c75874", "#ff8b95", "#ffcbb7"];
let color_boxes_2 = ["#00134c", "#0f2d8b", "#009ffa", "#00fdff", "#cfffff"];
let color_boxes_3 = ["#03fab7", "#03fd6e", "#c8ff53", "#fffb74", "#fffb9e"];
let color_boxes_4 = ["#5c2738", "#7d3946", "#ae5a57", "#ea866e", "#f1bd7b"];

let color_planes_1 = ["#0a0a0a", "#5e544f"];
var color_planes_2 = ["#aba5a3", "#f8f8ff"];


let props_planes =["num_plane:0; position:-8 5 -10; width:16; height:8; color:#0a0a0a; colors:" + color_planes_1,
  "num_plane:1; position:-8 -3 -10; width:16; height:8; color:#aba5a3; colors:" + color_planes_2,
  "num_plane:2; position:8 5 -10; width:16; height:8; color:#aba5a3; colors:" + color_planes_2,
  "num_plane:3; position:8 -3 -10; width:16; height:8; color:#0a0a0a; colors:" + color_planes_1];

let props_boxes =["depth:2; width:1; height:1; color:red; colors:" + color_boxes_1,
  "depth:2; width:1; height:1; color:blue; colors:" + color_boxes_2,
  "depth:2; width:1; height:1; color:green; colors:" + color_boxes_3,
  "depth:2; width:1; height:1; color:orange; colors:" + color_boxes_4];

let super_hands = "colliderEvent: raycaster-intersection; colliderEventProperty: els; colliderEndEvent: raycaster-intersection-cleared; colliderEndEventProperty: clearedEls"


AFRAME.registerComponent('main_component', {

  init: function() {

    var scene = document.querySelector("a-scene");

    entity = document.createElement ("a-entity");
    entity.setAttribute('cursor', 'rayOrigin:mouse');
    entity.setAttribute('super-hands', super_hands);
    entity.id = "entity" + 0;

    scene.appendChild(entity);

    plane = document.createElement ("a-plane");
    plane.setAttribute('plane-component', props_planes[0]);
    entity.appendChild(plane);

    scene.appendChild(entity);

    plane = document.createElement ("a-plane");
    plane.setAttribute('plane-component', props_planes[1]);
    entity.appendChild(plane);

    scene.appendChild(entity);

    plane = document.createElement ("a-plane");
    plane.setAttribute('plane-component', props_planes[2]);
    entity.appendChild(plane);

    scene.appendChild(entity);

    plane = document.createElement ("a-plane");
    plane.setAttribute('plane-component', props_planes[3]);
    entity.appendChild(plane);
  }

});


AFRAME.registerComponent('plane-component', {
  schema: {
    position: {default:"0 0 0"},
    width: {default:8},
    height: {default:8},
    color: {default:"black"},
    colors: {default:[]},
    num_plane: {default:0}
  },

  init: function () {
    var el = this.el;
    var data = this.data;

    el.setAttribute('position', data.position);
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);
    el.setAttribute('color', data.color);

    box = document.createElement ("a-box");
    box.setAttribute('box-component', props_boxes[data.num_plane] + "; position:0 0 0");
    box.id = "box" + data.num_plane;
    el.appendChild(box);
  },

  update: function() {
    var el = this.el;
    var data = this.data;
    var color_plano = el.getAttribute ("color");

    el.addEventListener('click', function () {
      while (el.getAttribute ("color") == color_plano) {
        color_plano = data.colors[Math.floor(Math.random()*data.colors.length)];
      }
      el.setAttribute('color', color_plano);
      box = document.getElementById("box" + data.num_plane);
      box.setAttribute('position', {x:nums_random(-7,7), y:nums_random(-3,3), z:0});
    });
  }
});

AFRAME.registerComponent('box-component', {
  schema: {
    depth: {default:0},
    width: {default:8},
    height: {default:8},
    color: {default:"black"},
    colors: {default:[]},
    position: {default: "0 0 0"}
  },

  init: function () {
    var el = this.el;
    var data = this.data;

    el.setAttribute('depth', data.depth);
    el.setAttribute('width', data.width);
    el.setAttribute('height', data.height);
    el.setAttribute('color', data.color);
    el.setAttribute('colors', data.colors);
    el.setAttribute('position', data.position);
  },

  update: function() {
    var el = this.el;
    var data = this.data;
    var color_box = el.getAttribute ("color");

    el.addEventListener('click', function () {
      while (el.getAttribute ("color") == color_box) {
        color_box = data.colors[Math.floor(Math.random()*data.colors.length)];
      }
      el.setAttribute('color', color_box);
    });
  }
});
