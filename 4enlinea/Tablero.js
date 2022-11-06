class Tablero {
  constructor(xEnLinea) {
    this.xEnLinea = xEnLinea; // pasa por constructor
    this.cantFilas = xEnLinea + 4;
    this.tablero = new Array(xEnLinea + 4);
  }

  addFicha(columna, ficha) {
    let col = parseInt(columna);
    //dada una columna elegida, la recorro hasta encontrar un lugar libre
    for (let index = 0; index < this.cantFilas - 1; index++) {
      // si el casillero index esta libre y el que le sigue tambien avanzo
      if (
        !this.tablero[index][col].estaOcupado() &&
        !this.tablero[index + 1][col].estaOcupado()
      ) {
      }
      // si el que sigue esta ocupado y el que estoy esta libre asigno la ficha al que estoy (index)
      if (
        this.tablero[index + 1][col].estaOcupado() &&
        !this.tablero[index][col].estaOcupado()
      ) {
        this.tablero[index][col].setOcupado(true);
        this.tablero[index][col].setFicha(ficha);
        let posX = col * 100;
        let posY = index * 100;
        ficha.setPos(posX + 50, posY + 50);
        ficha.setJugada(true);
      }
      // si llego al final y esa posicion no esta ocupada
      if (
        index + 1 == this.cantFilas - 1 &&
        !this.tablero[index + 1][col].estaOcupado()
      ) {
        this.tablero[index + 1][col].setOcupado(true);
        this.tablero[index + 1][col].setFicha(ficha);
        let posX = col * 100;
        let posY = (index + 1) * 100;
        ficha.setPos(posX + 50, posY + 50);
        ficha.setJugada(true);
      }
    }

    this.drawTablero();
  }
  chequearGanador(ficha) {
    if (this.ganoVertical(ficha)) {
      return true;
    }

    if (this.ganoHorizontal(ficha)) {
      return true;
    }
    if (this.ganoDiagonal(ficha)) {
      return true;
    } else {
      return false;
    }
  }

  ganoVertical(ficha) {
    let col = parseInt(ficha.getPosX() / 100);
    let fil = parseInt(ficha.getPosY() / 100);
    let jugador = ficha.getJugador().getNombre();
    //sentencia que evita que nos salgamos del tablero chequeando si hay ganador vertical
    if (fil + this.xEnLinea <= this.cantFilas) {
      for (let i = 0; i < this.xEnLinea; i++) {
        if (!this.tablero[fil + i][col].jugadorIgual(jugador)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  ganoHorizontal(ficha) {
    let fil = parseInt(ficha.getPosY() / 100);
    let jugador = ficha.getJugador().getNombre();
    let estado = false;

    for (let i = 0; i <= this.cantFilas - this.xEnLinea; i++) {
      let j = 0;
      //pregunto si el casillero esta ocupado y si el contenido es igual al de la ultima ficha colocada
      while (
        this.tablero[fil][i + j].noEstaVacio() &&
        this.tablero[fil][i + j].jugadorIgual(jugador)
      ) {
        j++; //si las condiciones anteriores se cumple, incremento J, luego checkeo que J sea el nro "X en linea"
        if (j == this.xEnLinea) {
          estado = true;
          return estado;
        }
      }
    }
    return estado;
  }

  
  ganoDiagonal(ficha) {//se detecta error, no define ganador diagonal en el caso de poner ficha en la esquina
    
    //algoritmo para busqueda en diagonal
    let col = parseInt(ficha.getPosX() / 100);
    let fil = parseInt(ficha.getPosY() / 100);
    let jugador = ficha.getJugador().getNombre();

    let i = col - this.xEnLinea + 1;
    let j = fil - this.xEnLinea + 1;///////////////////modificacion

    while (i <= col && j <= fil) {
      i++;
      j++;
      let index = 0;
      while (
        i >= 0 &&
        j >= 0 &&
        index < this.xEnLinea &&
        j + index < this.cantFilas  &&/////retire un (-1)
        i + index < this.cantFilas  &&///////// (-1)
        this.tablero[j + index][i + index].noEstaVacio() &&
        this.tablero[j + index][i + index].jugadorIgual(jugador)
      ) {
        index++;
        if (index == this.xEnLinea) {
          return true;
        }
      }
    }
    //algoritmo para busqueda "antidiagonal"
    i = col + this.xEnLinea - 1;
    j = fil - this.xEnLinea + 1;

    while (i >= col && j <= fil) {
      i--;
      j++;
      let index = 0;
      while (
        i < this.cantFilas &&//salir del tablero hacia derecha
        j >= 0 &&// salir del tablero  hacia arriba
        index < this.xEnLinea &&//si llegue a XenLinea
        j + index <= this.cantFilas - 1 &&//salir del tablero hacia abajo
        i - index >= 0 &&//salir del tablero hacia la izquierda
        this.tablero[j + index][i - index].estaOcupado() &&//pregunto si hay ficha en el casillero
        this.tablero[j + index][i - index].jugadorIgual(jugador)//comparo la ficha
      ) {
        index++;
        if (index == this.xEnLinea) {
          return true;
        }
      }
    }
    return false;
  }


  

  drawTablero() {
    for (let x = 0; x < this.tablero.length; x++) {
      for (let y = 0; y < this.tablero[x].length; y++) {
        if (this.tablero[x][y].estaOcupado()) {
          this.tablero[x][y].draw();
        }
      }
    }
  }

  crearArray(canvas, ctx) {
    for (var i = 0; i < this.xEnLinea + 4; i++) {
      this.tablero[i] = new Array(this.xEnLinea + 4);
    }
    this.inicializarTablero(canvas, ctx);
  }

  inicializarTablero(canvas, ctx) {
    for (let x = 0; x < this.tablero.length; x++) {
      for (let y = 0; y < this.tablero.length; y++) {
        let casillero = new Casillero(x, y, canvas, ctx);
        this.tablero[x][y] = casillero;
      }
    }
  }

  dibujarTablero() {
    for (let x = 0; x < this.tablero.length; x++) {
      for (let y = 0; y < this.tablero.length; y++) {
        this.tablero[x][y].draw();
      }
    }
  }
}
