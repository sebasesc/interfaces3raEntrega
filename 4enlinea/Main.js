"use strict";

function xEnLinea() {
  let xEnLinea = parseInt(document.querySelector("#selectXenlinea").value);
  console.log(Math.pow(parseInt(xEnLinea + 4), 2));
  return xEnLinea;
}

let xLinea = parseInt(xEnLinea());
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");

let juego = new Juego(canvas, ctx, xLinea);

function iniciarJuego() {
  juego.crearTablero();
  juego.generarFichas();
  juego.drawFigure();
  temporizadorDeRetraso();
}

function finalizarJuego() {
  canvas.removeEventListener('mousedown', onMouseDown, false)
  alert("finalizo el juego");
  clearInterval(interval);
}


//capturar eventos
function onMouseDown(e) {
  let x = e.offsetX;
  let y = e.offsetY;
  juego.onMouseDown(x, y);
}
function onMouseUp(e) {
  juego.onMouseUp();
}

function onMouseMove(e) {
  let x = e.offsetX;
  let y = e.offsetY;
  juego.onMouseMove(x, y);
}
canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mouseup", onMouseUp, false);
canvas.addEventListener("mousemove", onMouseMove, false);

let btnIniciar = document.querySelector("#btn-iniciar");
btnIniciar.addEventListener("click", iniciarJuego);

let btnReiniciar = document.querySelector("#btn-reiniciar");
btnReiniciar.addEventListener("click", reiniciarJuego);

function reiniciarJuego() {
    location.reload()
}



//Definimos y ejecutamos los segundos
let minutos = 5;
let segundos = 0;
function cargarSegundo() {
  let txtSegundos;

  if (segundos < 0) {
    segundos = 59;
  }
  if (segundos == 0 && minutos == 0) {
    console.log("fin del juego");
    borrarAlerta();
  }

  //Mostrar Segundos en pantalla
  if (segundos < 10) {
    txtSegundos = `0${segundos}`;
  } else {
    txtSegundos = segundos;
  }
  document.getElementById("segundos").innerHTML = txtSegundos;
  segundos--;

  cargarMinutos(segundos);
}
//Definimos y ejecutamos los minutos
function cargarMinutos(segundos) {
  let txtMinutos;

  if (segundos == -1 && minutos !== 0) {
    setTimeout(() => {
      minutos--;
    }, 500);
  } else if (segundos == -1 && minutos == 0) {
    setTimeout(() => {
      minutos = 59;
    }, 500);
  }
  //Mostrar Minutos en pantalla
  if (minutos < 10) {
    txtMinutos = `0${minutos}`;
  } else {
    txtMinutos = minutos;
  }
  document.getElementById("minutos").innerHTML = txtMinutos;
}

let temporizador;

function temporizadorDeRetraso() {
    temporizador = setInterval(cargarSegundo, 1000);
}

function borrarAlerta() {
  clearInterval(temporizador);
}
