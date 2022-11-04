
function temporizadorDeRetraso() {
  identificadorTiempoDeEspera = setTimeout(funcionConRetraso, 5000);
}

function funcionConRetraso() {
    document.getElementById('onload').remove()
    var div = document.getElementById('bodyRemove');
    div.classList.remove('hidden');
}

temporizadorDeRetraso()


function ocultar(){
    document.getElementById('menu').style.display = 'none';
}



function mostrarMenu(){
    console.log("mostrar-menu")
    document.getElementById('menu').style.display = '';
}



let btnMenu = document.getElementById('abrir-menu')
btnMenu.addEventListener('click', mostrarMenu);


let btnX = document.getElementById('cerrar-menu')
btnX.addEventListener('click', ocultar);

ocultar();


const main_img = document.querySelector(".main_img");
const thumbnails = document.querySelectorAll(".thumbnail");

thumbnails.forEach((thumb) => {
  thumb.addEventListener("mouseover", function () {
    const active = document.querySelector(".active");
    active.classList.remove("active");
    thumb.classList.add("active");
    main_img.src = thumb.src;
  });
});

const carrusel = document.querySelector(".carr-destacados");

let maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;
let intervalo = null;
let step = 1;
const start = () => {
  intervalo = setInterval(function () {
    carrusel.scrollLeft = carrusel.scrollLeft + step;
    if (carrusel.scrollLeft === maxScrollLeft) {
      step = -10;
    } else if (carrusel.scrollLeft === 0) {
      step = 1;
    }
  }, 15);
};

const stop = () => {
  clearInterval(intervalo);
};

carrusel.addEventListener("mouseover", () => {
  stop();
});

carrusel.addEventListener("mouseout", () => {
  start();
});

start();

