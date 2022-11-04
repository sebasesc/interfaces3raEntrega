let canvas = document.querySelector('#canvas');

/** @type {CanvasRenderingContext2D} */

let ctx = canvas.getContext("2d");

let canvasWidth = canvas.width;

let canvasHeight = canvas.height;

let x = document.querySelector('#numTamanio');

let tamanioTablero = x * 16;

let img1 = document.getElementById('img1');
let jugador1 = new Jugador(true, 'jugador 1')
let jugador2 = new Jugador(false, 'jugador 2')

let juego = new Juego(canvas, ctx, canvasWidth, canvasHeight, x, jugador1, jugador2,img1);

let color1 = 'red';
let color2 = '#efe705'; 




juego.crearTablero();

juego.generarFichas(jugador1,color1)
juego.generarFichas(jugador2,color2)

juego.drawFigure();
juego.drawFigure();



function onMouseDown(e){
    let x = e.layerX;
    let y = e.layerY;
    juego.onMouseDown(x, y);
}
function onMouseUp(e){
    juego.onMouseUp();
}

function onMouseMove(e){
    let x = e.layerX;
    let y = e.layerY;
    juego.onMouseMove(x, y);
}



canvas.addEventListener('mousedown', onMouseDown, false)
canvas.addEventListener('mouseup', onMouseUp, false)
canvas.addEventListener('mousemove', onMouseMove, false)
