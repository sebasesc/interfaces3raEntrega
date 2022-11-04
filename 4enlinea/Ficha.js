class Ficha{
    constructor(posX, posY,radius,context, jugador, fill){
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.ctx = context;
        this.jugador = jugador;
        this.fill = fill;
        this.isResaltado = false;
        this.resaltadoEstilo = 'black';
        this.isMov = false;
        this.cant = 0;
    }

    getCant(){
        return this.cant;
    }
    setCant(val){
        this.cant = this.cant + val;
    }

    getJugador(){
        return this.jugador;
    }

    setPos(x,y){
        this.posX = x;
        this.posY = y;
    }
    setPosX(x){
        this.posX = x;
    }
    setPosY(y){
        this.posY = y;
    }
    setFill(fill){
        this.fill = fill;
    }
    setRadius(r){
        this.radius = r;
    }
    getRadius(){
        return this.radius;
    }
    getPos(){
        return{
            x: this.getPosX(),
            y: this.getPosY()
        };
    }
    getPosX(){
        return this.posX;
    }
    getPosY(){
        return this.posY;
    }
    getFill(){
        return this.fill;
    }
    
    setResaltado(estado){
        this.isResaltado = estado;
       // console.log(this.resaltado);
    }

    setMov(estado){
        this.isMov = estado;
    }

    getMov(){
        return this.isMov;
    }
    mismoJugador(otroJugador){
        return this.getJugador() == otroJugador;
    }

    draw(){
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2* Math.PI);
        this.ctx.fill();
        if(this.isResaltado === true){
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
        this.ctx.closePath();
    }

    isPointInside(x, y){
        let _x =this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y *_y)< this.radius;

    }
}