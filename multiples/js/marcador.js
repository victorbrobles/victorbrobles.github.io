
function actualizaMarcadorPiezaFunction (data) {
  if (tipoPiezaMarcador == "der") {
    var pieza = document.getElementById("cubo_der" + contadorPiezaDer);
  } else if (tipoPiezaMarcador == "izq") {
    var pieza = document.getElementById("cubo_izq" + contadorPiezaIzq);
  } else {
    var pieza = document.getElementById("cubo" + contadorPieza);
  }

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
