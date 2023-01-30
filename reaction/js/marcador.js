
function actualizaMarcadorPiezaFunction (data) {
  var pieza = document.getElementById("cubo" + contadorPieza);
  var alturaPieza = pieza.getAttribute('height');
  var anchuraPieza = pieza.getAttribute('width');

  var valorTotal = Number(alturaPieza) * Number(anchuraPieza) * 100;
  scoreActual = Number(scoreActual) + Number(valorTotal);

  var texto = document.getElementById("valorscore");
  texto.setAttribute('text', "value:HIGH SCORE: " + scoreActual + "; width: " + data.anchuraTexto + "; height: " + data.alturaTexto + "; align: center; color: #FFFFFF; shader: msdf; font: " + fuenteScore);
  actualizaMarcadorPieza = false;
}

function actualizaMarcadorFilaFunction (data) {
  scoreActual = Number(scoreActual) + (5000 * numFilasEliminadas);

  var texto = document.getElementById("valorscore");
  texto.setAttribute('text', "value:HIGH SCORE: " + scoreActual + "; width: " + data.anchuraTexto + "; height: " + data.alturaTexto + "; align: center; color: #FFFFFF; shader: msdf; font: " + fuenteScore);
  actualizaMarcadorFila = false;
}

function restarPuntos(data) {
  scoreActual = Number(scoreActual) - 1000;

  var texto = document.getElementById("valorscore");
  texto.setAttribute('text', "value:HIGH SCORE: " + scoreActual + "; width: " + data.anchuraTexto + "; height: " + data.alturaTexto + "; align: center; color: #FFFFFF; shader: msdf; font: " + fuenteScore);
  restarPuntosBool = false;
}
