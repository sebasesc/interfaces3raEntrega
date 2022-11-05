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
        this.ctx.fillStyle = '#eaeaea';
        
        this.ctx.beginPath();
        this.ctx.arc( (this.x * 100) + 50, (this.y * 100) + 50, 40, 0, 2* Math.PI);
        
        this.ctx.fill();

       
        this.ctx.closePath();
    }

   


}