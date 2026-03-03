export default class Estudiantes {
    #nombre;
    #edad;
    #calificacion;

    constructor(nombre, edad, calificacion) {
        this.#nombre = nombre;
        this.#edad = edad;
        this.#calificacion = calificacion;
    }
}