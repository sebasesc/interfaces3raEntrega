class Juego {
  constructor(canvas, ctx, canvasWidth, canvasHeight, tamanioTablero) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.tamanioTablero = 8; // revisar
    this.xEnLinea = 4;
    this.fichas = new Array();
    this.lastClicked = null;
    this.isMouseDown = false;
    this.tablero = new Tablero(this.tamanioTablero, this.xEnLinea);
  }

  getFichasJ1() {
    return this.fichasJ1;
  }
  getFichasJ1() {
    return this.fichasJ2;
  }

  generarFichas(jugador, color) {
    for (var i = 0; i < 20; i++) {
      this.addFicha(jugador, color);
    }
  }

  addFicha(jugador, color) {
    let min = 0.65;
    let max = 0.95;
    let posX = Math.round(
      (Math.random() * (max - min) + min) * this.canvasWidth
    );
    let posY = Math.round(Math.random() * this.canvasHeight - 100);
    
    let ficha = new Ficha((posX + 50), (posY + 50), 40, this.ctx, jugador, color);
    this.fichas.push(ficha);
  }

  drawFigure() {
    this.clearCanvas();
    this.tablero.dibujarTablero()
    for (const ficha of this.fichas) {
      if(ficha){
        ficha.draw();
      }
    }
  }


  clearCanvas() {
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  onMouseMove(x, y) {
    if (this.isMouseDown && this.lastClicked != null) {
      this.lastClicked.setPos(x, y);
      this.lastClicked.setMov(true);
      this.drawFigure();
    }
  }

  crearTablero(){
    this.tablero.crearArray(this.canvas, this.ctx);
  }

  onMouseUp() {
    
    this.isMouseDown = false;
    if(this.lastClicked != null){
      this.lastClicked.setResaltado(false);
      let posX = Math.round((this.lastClicked.getPosX() - 50) / 100);

      console.log('columna: ', posX);
      if(posX < this.tamanioTablero){

        this.tablero.addFicha(posX, this.lastClicked);
        this.drawFigure();
        
        if(this.tablero.chequearGanador(this.lastClicked)){
          alert('gano jugador :' + this.lastClicked.getJugador());
        }
      }
    }

  }


  onMouseDown(x, y) {
    this.isMouseDown = true;
    //console.log(x, y)
    if (this.lastClicked != null) {
      this.lastClicked.setResaltado(false);
      this.lastClicked = null;
    }
    let clickFicha = this.findClickedFigure(x, y);

    if (clickFicha != null) {
      clickFicha.setResaltado(true);
      this.lastClicked = clickFicha;
    }
    this.drawFigure();
    //console.log(clickFicha)
  }

  findClickedFigure(x, y) {
    for (const ficha of this.fichas) {
      if (ficha !== null && ficha.isPointInside(x, y)) {
        return ficha;
      }
    }
  }

eliminarFicha(ficha){
  for (let i = 0; i < this.fichas.length; i++) {
    if(i !== null && ficha === this.fichas[i]){
      console.log("se elimino ficha " + ficha )
      this.fichas[i] = null;
    }
  }
}

}