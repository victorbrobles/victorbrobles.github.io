
let fuenteScore = "https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/creepster/Creepster-Regular.json";

//Límites horizontales y límite vertical
let alturaSuelo = 0;
let limiteIzq = 0;
let limiteDer = 0;

//Booleans para activar funciones
let actualizaMarcadorPieza = false;
let actualizaMarcadorFila = false;
let imprimeTableroBool = true;

//Inicialización del controlador
let posController = {x: 0, y: 0, z: 0};
let posControllerTrasero = {x: 0, y: 0, z: 0};

//Variable de nueva posición pieza
let nuevaPos = "";
let nuevaPosTrasera = "";

//Tablero
let tablero = [];
let tableroTrasero = [];

let anchuraTablero = 0;
let alturaTablero = 0;

//Piezas
let contadorPieza = 0;
let contadorPiezaTrasera = 0;

let crearPieza = true;
let crearPiezaTrasera = true;

let rotarPieza = false;
let rotarPiezaTrasera = false;

let bajarPieza = false;
let bajarPiezaTrasera = false;

let moverPieza = false;
let moverPiezaTrasera = false;

//Otras variables
let velocidad = 0.01;
let scoreActual = 0;
let numFilasEliminadas = 0;
