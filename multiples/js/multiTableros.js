
function crearTableroIzqFunction() {

  separacionTableros = Number(anchuraTablero*3);

  posXTablerosIzq -= separacionTableros;

  var props = damePropsTablero(posXTablerosIzq);

  var entornoTableros = document.getElementById("tableros");

  var entity = document.createElement('a-entity');
  entity.id = "tableroizq";
  entity.setAttribute('tablero', props);

  var piezas = document.createElement('a-entity');
  piezas.id = "piezas_izq";

  entity.appendChild(piezas);
  entornoTableros.appendChild(entity);

  var botonIzq = document.getElementById('tablerosizq');
  botonIzq.remove();

  crearBotones(posXTablerosIzq);
  crearControlador(posXTablerosIzq);

}

function crearTableroDerFunction() {
  separacionTableros = Number(anchuraTablero*3);

  posXTablerosDer += separacionTableros;

  var props = damePropsTablero(posXTablerosDer);

  var entornoTableros = document.getElementById("tableros");

  var entity = document.createElement('a-entity');
  entity.id = "tableroder"
  entity.setAttribute('tablero', props);

  var piezas = document.createElement('a-entity');
  piezas.id = "piezas_der";

  entity.appendChild(piezas);
  entornoTableros.appendChild(entity);

  var botonDer = document.getElementById('tablerosder');
  botonDer.remove();

  crearBotones(posXTablerosDer);
  crearControlador(posXTablerosDer);
}


function damePropsTablero(pos) {
  var tableroOriginal = document.getElementById('tablero');
  var suelo = document.getElementById('suelo');
  var paredIzq = document.getElementById('pared_izq');
  var paredDer = document.getElementById('pared_der');

  var posSueloOriginal = suelo.getAttribute('position');
  var positionSuelo = Number(posSueloOriginal.x + pos) + " " + posSueloOriginal.y + " " + posSueloOriginal.z;

  var colorTablero = suelo.getAttribute('color');

  var alturaPared = paredIzq.getAttribute('height');
  var anchuraPared = paredIzq.getAttribute('width');

  var posParedIzqOriginal = paredIzq.getAttribute('position');
  var posParedDerOriginal = paredDer.getAttribute('position');

  var positionParedIzq = Number(posParedIzqOriginal.x + pos) + " " + posParedIzqOriginal.y + " " + posParedIzqOriginal.z;
  var positionParedDer = Number(posParedDerOriginal.x + pos) + " " + posParedDerOriginal.y + " " + posParedDerOriginal.z;

  if (pos > 0) {
    var id = "der";
  } else {
    var id = "izq";
  }

  return "alturaSuelo: " + alturaSuelo + "; anchuraSuelo: " + anchuraTablero + "; positionSuelo: " + positionSuelo + "; colorTablero: "
    + colorTablero + "; alturaPared: " + alturaPared + "; anchuraPared: " + anchuraPared + "; positionParedIzq: " + positionParedIzq
    + "; positionParedDer: " + positionParedDer + "; idSuelo: suelo_" + id + "; idParedIzq: pared_izq_" + id + "; idParedDer: pared_der_" + id;
}


function crearBotones(pos) {
  var botonBajarOriginal = document.getElementById('bajarpieza');
  var botonRotarOriginal = document.getElementById('rotarpieza');

  var positionBajar = botonBajarOriginal.getAttribute('position');
  var positionRotar = botonRotarOriginal.getAttribute('position');

  var colorBajar = botonBajarOriginal.getAttribute('color');
  var colorRotar = botonRotarOriginal.getAttribute('color');

  var widthBajar = botonBajarOriginal.getAttribute('width');
  var widthRotar = botonRotarOriginal.getAttribute('width');

  var heightBajar = botonBajarOriginal.getAttribute('height');
  var heightRotar = botonRotarOriginal.getAttribute('height');

  var depthBajar = botonBajarOriginal.getAttribute('depth');
  var depthRotar = botonRotarOriginal.getAttribute('depth');

  var mixinBajar = botonBajarOriginal.getAttribute('mixin');
  var mixinRotar = botonRotarOriginal.getAttribute('mixin');

  var textoBotonBajarOriginal = document.getElementById('bajarpiezatext');
  var textoBotonRotarOriginal = document.getElementById('rotarpiezatext');

  var positionTextBajar = textoBotonBajarOriginal.getAttribute('position');
  var positionTextRotar = textoBotonRotarOriginal.getAttribute('position');

  var positionFinalBajar = Number(positionBajar.x + pos) + " " + positionBajar.y + " " + positionBajar.z;
  var positionFinalRotar = Number(positionRotar.x + pos) + " " + positionRotar.y + " " + positionRotar.z;

  if (pos > 0) {
    var id = "der";
    var positionTextBajar = "-0.4 -0.4 1";
    var positionTextRotar = "-0.9 -0.4 1";
  } else {
    var id = "izq";
    var positionTextBajar = "0.9 -0.4 1";
    var positionTextRotar = "0.4 -0.4 1";
  }

  var propsBajar = "position: " + positionFinalBajar + "; color: " + colorBajar + "; width: " + widthBajar + "; height: " + heightBajar
    + "; depth: " + depthBajar + "; id: bajarpieza" + id + "; mixin: " + mixinBajar + "; positionText: " + positionTextBajar
    + "; colorText: black; alignText: center; valueText: BAJAR PIEZA; widthText: 10; idText: bajarpiezatext" + id;

  var propsRotar = "position: " + positionFinalRotar + "; color: " + colorRotar + "; width: " + widthRotar + "; height: " + heightRotar
    + "; depth: " + depthRotar + "; id: rotarpieza" + id + "; mixin: " + mixinRotar + "; positionText:" + positionTextRotar + "; colorText: black; alignText: center; valueText: ROTAR PIEZA; widthText: 10; idText: rotarpiezatext" + id;

  var entornoBotones = document.getElementById('botonespiezas');

  var entity = document.createElement('a-entity');
  entity.id = "botonesbajarrotar" + id;

  var botonBajar = document.createElement('a-box');
  botonBajar.setAttribute('bajarpieza', propsBajar);

  var botonRotar = document.createElement('a-box');
  botonRotar.setAttribute('rotarpieza', propsRotar);

  entity.appendChild(botonBajar);
  entity.appendChild(botonRotar);
  entornoBotones.appendChild(entity);

}


function crearControlador(pos) {
  var mando = document.getElementById('mando');

  var heightMando = mando.getAttribute('height');
  var widthMando = mando.getAttribute('width');
  var positionMando = mando.getAttribute('position');
  var rotationMando = mando.getAttribute('rotation');
  var colorMando = mando.getAttribute('color');

  var controller = document.getElementById('controller');

  var heightController = controller.getAttribute('height');
  var widthController = controller.getAttribute('width');
  var positionController = controller.getAttribute('position');
  var rotationController = controller.getAttribute('rotation');
  var colorController = controller.getAttribute('color');
  var radiusController = controller.getAttribute('radius');
  var mixinController = controller.getAttribute('mixin');

  if (pos > 0) {
    var id = "der";
  } else {
    var id = "izq";
  }

  var positionMandoFinal = Number(positionMando.x + pos/3) + " " + positionMando.y + " " + positionMando.z;
  var rotationMandoFinal = rotationMando.x + " " + rotationMando.y + " " + rotationMando.z;
  var positionControllerFinal = Number(positionController.x + pos/3) + " " + positionController.y + " " + positionController.z
  var rotationControllerFinal = rotationController.x + " " + rotationController.y + " " + rotationController.z;


  var propsMando = "height: " + heightMando + "; width: " + widthMando + "; position: " + positionMandoFinal + "; rotation: " + rotationMandoFinal
    + "; color: " + colorMando + "; id: mando" + id;

  var propsController = "height: " + heightController + "; width: " + widthController + "; position: " + positionControllerFinal + "; rotation: " + rotationControllerFinal
    + "; color: " + colorController + "; id: controller" + id + "; radius: " + radiusController + "; mixin: " + mixinController;

  var entornoControlador = document.getElementById('mandocontrolador');
  var entity = document.createElement('a-entity');
  entity.id = "controllerentity" + id;

  var mandoObj = document.createElement('a-plane');
  mandoObj.setAttribute('mando', propsMando);

  var controllerObj = document.createElement('a-sphere');
  controllerObj.setAttribute('controller', propsController);

  entity.appendChild(mandoObj);
  entity.appendChild(controllerObj);
  entornoControlador.appendChild(entity);
}
