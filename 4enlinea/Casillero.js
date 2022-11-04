class Casillero{
    constructor(x, y, canvas, ctx){
       this.ocupado = false; 
       this.ficha = null;
       this.x = x;
       this.y = y;
       this.canvas = canvas;
       this.ctx = ctx;
    }
    draw(){
        this.ficha.draw();
    }

    estaOcupado(){
        return this.ocupado;
    }

    setOcupado(estado){
        this.ocupado = estado;
    }

    getFicha(){
        return this.ficha;
    }
    
    setFicha(ficha){
        this.ficha = ficha;
    }
    jugadorIgual(otroJugador){// metodo para comparar fichas de mismo jugador
      return this.getFicha().mismoJugador(otroJugador);
    }

    noEstaVacio(){// devuelve true si tiene ficha (es similar a estaOcupado)
        return this.ficha != null;
    }


    draw(){
        this.ctx.fillStyle = '#dedede';
        this.ctx.beginPath();
        let width = 90;
        let height = 90;
        let posX = (this.x * 100) - (width / 2);
        let posY = (this.y * 100) - (height / 2);
        this.ctx.fillRect((posX + 50),(posY + 50), width, height);
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect((posX + 50), (posY + 50), width, height);
        this.ctx.fill();

       
        this.ctx.closePath();
    }

   


}