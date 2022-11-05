let canvas = document.querySelector('#canvas');

/** @type {CanvasRenderingContext2D} */

let ctx = canvas.getContext("2d");

let canvasWidth = canvas.width;

let canvasHeight = canvas.height;

let x = document.querySelector('#numTamanio');

let tamanioTablero = x * 16;

let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');

let jugador1 = new Jugador(true, 'jugador 1')
let jugador2 = new Jugador(false, 'jugador 2')

let juego = new Juego(canvas, ctx, canvasWidth, canvasHeight, x, jugador1, jugador2);
juego.crearTablero();
juego.generarFichas(jugador1,img1)
juego.generarFichas(jugador2,img2)

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

function finalizarJuego() {
    canvas.removeEventListener('mousedown', onMouseDown, false)
    alert("finalizo el juego");
    clearInterval(interval);
}



let minutos = 5;
let segundos = 0;


cargarSegundo();
//Definimos y ejecutamos los segundos
function cargarSegundo(){
    let txtSegundos;

    if(segundos < 0){
        segundos = 59; 
    }
    if(segundos == 0 && minutos == 0){
        console.log('fin del juego')
        finalizarJuego();        
    }

    //Mostrar Segundos en pantalla
    if(segundos < 10){
        txtSegundos = `0${segundos}`;
    }else{
        txtSegundos = segundos;
    }
    document.getElementById('segundos').innerHTML = txtSegundos;
    segundos--;

    cargarMinutos(segundos);
}
//Definimos y ejecutamos los minutos
function cargarMinutos(segundos){
    let txtMinutos;

    if(segundos == -1 && minutos !== 0){
        setTimeout(() =>{
            minutos--;
        },500)
    }else if(segundos == -1 && minutos == 0){
        setTimeout(() =>{
            minutos = 59;
        },500)
    }
    //Mostrar Minutos en pantalla
    if(minutos < 10){
        txtMinutos = `0${minutos}`;
    }else{
        txtMinutos = minutos;
    }
    document.getElementById('minutos').innerHTML = txtMinutos;
}

function reiniciarJuego() {
    location.reload()
}

let btnIniciar = document.querySelector('#btn-iniciar');
btnIniciar.addEventListener('click', reiniciarJuego); //);

let interval = setInterval(cargarSegundo,1000);






