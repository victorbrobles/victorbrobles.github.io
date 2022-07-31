
let fuenteScore = "https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/creepster/Creepster-Regular.json";

//Límites horizontales y límite vertical
let alturaSuelo = 0;
let limiteIzq = 0;
let limiteDer = 0;

//Booleans para activar funciones
let rotarPieza = false;
let bajarPieza = false;
let moverPieza = false;
let crearPieza = true;
let actualizaMarcadorPieza = false;
let actualizaMarcadorFila = false;

//Inicialización del controlador
let posController = {x: 0, y: 0, z: 0};

//Variable de nueva posición pieza
let nuevaPos = "";

//Tablero
let tablero = [];
let anchuraTablero = 0;
let alturaTablero = 0;

//Piezas
let contadorPieza = 0;

//Otras variables
let velocidad = 0.005;
let scoreActual = 0;
let imprimeTableroBool = true;
let numFilasEliminadas = 0;

//MULTITABLEROS
let posXTablerosIzq = 0;
let posXTablerosDer = 0;
let crearTablerosIzq = false;
let crearTablerosDer = false;
let separacionTableros = 0;

let tableroDerCreado = false;
let tableroIzqCreado = false;

let crearPiezaIzq = false;
let crearPiezaDer = false;

let contadorPiezaIzq = 0;
let contadorPiezaDer = 0;
