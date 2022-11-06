"use strict";
function xEnLinea() {
  let xEnLinea = parseInt(document.querySelector("#selectXenlinea").value);
  console.log(Math.pow(parseInt(xEnLinea + 4), 2));
  return xEnLinea;
}

let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");
let canvas = document.querySelector("#canvas");
let juego;

function iniciarJuego() {

let xLinea = parseInt(xEnLinea());//traemos el valor XenLinea que define las reglas del juego, X puede ser 4, 5 o 6

let ctx = canvas.getContext("2d");//definimos el contexto
  juego = new Juego(canvas, ctx, xLinea); //instanciamos el objeto juego 
  juego.crearTablero();
  juego.generarFichas();
  juego.drawFigure();
 
  temporizadorDeRetraso();
}
// definimos las coordenadas(x, y) de los eventos, para pasarlas como parametro a Juego
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
if(juego != undefined){
    juego.onMouseMove(x, y);
}

}
canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mouseup", onMouseUp, false);
canvas.addEventListener("mousemove", onMouseMove, false);


function finalizarJuego() {
  // al acabar el juego, se muestra un alerta y se dejan de recibir los eventos del mouse
  console.log("finalizo el juego");
  borrarAlerta()
  canvas.removeEventListener('mousedown', onMouseDown, false)

}


let btnIniciar = document.querySelector("#btn-iniciar");
btnIniciar.addEventListener("click", iniciarJuego);

let btnReiniciar = document.querySelector("#btn-reiniciar");
btnReiniciar.addEventListener("click", reiniciarJuego);

function reiniciarJuego() {
    location.reload()
}


// funciones para el cronometro

let minutos = 5;
let segundos = 0;

//Definimos y ejecutamos los segundos
function cargarSegundo() {
  let txtSegundos;

  if (segundos < 0) {
    segundos = 59;
  }
  if (segundos == 0 && minutos == 0) {
    finalizarJuego()
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
