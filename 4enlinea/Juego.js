class Juego {
  constructor(
    canvas,
    ctx,
    canvasWidth,
    canvasHeight,
    tamanioTablero,
    jugador1,
    jugador2
  ) {
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
    this.jugador1 = jugador1;
    this.jugador2 = jugador2;
  }

  getFichasJ1() {
    return this.fichasJ1;
  }
  getFichasJ1() {
    return this.fichasJ2;
  }

  generarFichas(jugador, img) {
    for (var i = 0; i < 20; i++) {
      this.addFicha(jugador, img);
    }
  }

  addFicha(jugador, img) {
    let min = 0.65;
    let max = 0.95;
    let posX = Math.round(
      (Math.random() * (max - min) + min) * this.canvasWidth
    );
    let posY = Math.round(Math.random() * this.canvasHeight - 100);
    let ficha = new Ficha(posX + 50, posY + 50, 40, this.ctx, jugador, img);
    this.fichas.push(ficha);
  }

  drawFigure() {
    this.clearCanvas();
    this.tablero.dibujarTablero();
    for (const ficha of this.fichas) {
      if (ficha) {
        ficha.draw();
      }
    }
  }

  clearCanvas() {
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(0, 0, 800, 800);
  }

  onMouseMove(x, y) {
    if (
      this.isMouseDown &&
      this.lastClicked != null &&
      !this.lastClicked.fueJugada() &&
      this.lastClicked.getJugador().esSuTurno()
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
    this.isMouseDown = false;
    if (this.lastClicked != null && !this.lastClicked.fueJugada()) {
      this.lastClicked.setResaltado(false);
      let posX = Math.round((this.lastClicked.getPosX() - 50) / 100);
      if (posX < this.tamanioTablero) {
        this.tablero.addFicha(posX, this.lastClicked);
        this.drawFigure();
        if (this.tablero.chequearGanador(this.lastClicked)) {
          alert("ganó " + this.lastClicked.getJugador().getNombre());
        }
        this.jugador1.setTurno(jugador2.esSuTurno());
        this.jugador2.setTurno(!jugador1.esSuTurno());
      }
    }
  }

  onMouseDown(x, y) {
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
    for (const ficha of this.fichas) {
      if (ficha !== null && ficha.isPointInside(x, y)) {
        return ficha;
      }
    }
  }
}
