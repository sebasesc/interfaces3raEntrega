let canvas = document.querySelector('#canvas');

/** @type {CanvasRenderingContext2D} */

let ctx = canvas.getContext("2d");

let canvasWidth = canvas.width;

let canvasHeight = canvas.height;

let x = document.querySelector('#numTamanio');

let tamanioTablero = x * 16;

let juego = new Juego(canvas, ctx, canvasWidth, canvasHeight, x);

let color1 = 'red';

let color2 = 'blue';    
juego.crearTablero();

juego.generarFichas(1,color1)
juego.generarFichas(2,color2)

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
