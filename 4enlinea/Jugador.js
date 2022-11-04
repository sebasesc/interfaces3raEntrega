class Jugador{
    constructor(turno, nombre){
        this.nombre = nombre;
        this.turno = turno;
    }

    getNombre(){
        return this.nombre;
    }

    esSuTurno(){
        return this.turno
    }
    setTurno(turno){
        this.turno = turno;
    }


}