class Juego {
  constructor(
    canvas, ctx, xLinea
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.xEnLinea = xLinea;

    this.canvas.width = ((this.xEnLinea + 4) * 100) + (this.xEnLinea * 100);
    this.canvas.height = (this.xEnLinea + 4) * 100;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.fichas = new Array();
    this.lastClicked = null;
    this.isMouseDown = false;
    this.tablero = new Tablero(xLinea);
    this.jugador1 = new Jugador(true, 1)
    this.jugador2 = new Jugador(false, 2)
  }

  generarFichas() {
//agrega fichas dependiendo del tamaño del juego(xEnLinea) al jugador 1 y 2
    for (var i = 0; i < Math.pow(this.xEnLinea + 4, 2); i++) {
      this.addFicha(this.jugador1, img1);
    }
    for (var i = 0; i < Math.pow(this.xEnLinea + 4, 2); i++) {
      this.addFicha(this.jugador2, img2);
    }
  }

  addFicha(jugador, img) {
    //al inicar el juego, suelta las fichas en un rango del canvas para cada jugador
    let min = 0.85;
    let max = 0.90;
    if(jugador.getNombre() === 1){
      min = min - 0.15
      max = max - 0.15
    }
    let posX = Math.round(
      (Math.random() * (max - min) + min) * this.canvasWidth
    );
    let maxY = 0.58;
    let minY = 0.1
    let posY = Math.round((Math.random() * (maxY - minY) + minY) * this.canvasWidth);

    let ficha = new Ficha(posX + 50, posY + 50, 40, this.ctx, jugador, img);
    this.fichas.push(ficha);
  }

  drawFigure() {
    //llamo a dibujar a cada una de las fichas del array
    this.clearCanvas();
    this.tablero.dibujarTablero();
    for (const ficha of this.fichas) {
      if (ficha) {
        ficha.draw();
      }
    }
  }

  clearCanvas() {
    //dibujo el tablero en blanco
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(0, 0, (this.xEnLinea + 4) * 100, (this.xEnLinea + 4) * 100);
  }

  onMouseMove(x, y) {
  //arrastro ficha si cumple determinadas condiciones: sea clickeable, sea la ficha del jugador de turno, etc
    if (
      this.isMouseDown &&
      this.lastClicked != null &&
      !this.lastClicked.fueJugada() 
      && this.lastClicked.getJugador().esSuTurno()
    ) {
      this.lastClicked.setPos(x, y);
      this.lastClicked.setMov(true);
      this.drawFigure();
    }
  }

  crearTablero() {
    this.clearCanvas();
    if (this.tablero != null) {
      this.tablero.crearArray(this.canvas, this.ctx);
    }
  }

  onMouseUp() {
    //suelto ficha si cumplo con determinadas condiciones
    this.isMouseDown = false;
    if (this.lastClicked != null && !this.lastClicked.fueJugada()) {
      this.lastClicked.setResaltado(false);//si tenia clickeada una ficha que no habia sido jugada, la desmarco
      let posX = Math.round((this.lastClicked.getPosX() - 50) / 100);//y le asigno la nueva posicion (sea o no en el tablero)
      if (posX < this.xEnLinea + 4) {//pregunto si cayo en el tablero
        this.tablero.addFicha(posX, this.lastClicked);//la agrego en el tablero
        this.drawFigure();
        if (this.tablero.chequearGanador(this.lastClicked)) {//checqueo si con la ultima ficha que solte hay un ganador
          alert("ganó" + this.lastClicked.getJugador().getNombre());
        }
        this.jugador1.setTurno(this.jugador2.esSuTurno());//cambio de turno
        this.jugador2.setTurno(!this.jugador1.esSuTurno());
      }
    }
  }

  onMouseDown(x, y) {
    //funcion que al hacer click checkea si lo hice sobre una ficha y la resalta
    this.isMouseDown = true;
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
  }

  findClickedFigure(x, y) {
    // busca si las coordenadas pertenecen a alguna ficha del array
    for (const ficha of this.fichas) {
      if (ficha !== null && ficha.isPointInside(x, y)) {
        return ficha;
      }
    }
  }
}
