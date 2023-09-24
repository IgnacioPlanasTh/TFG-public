import { Palabra } from "./Palabra";
import { Usuario } from "./Usuario";

export class Mazo {
  constructor(json) {
    this._id = json._id;
    this.descripcion = json.descripcion;
    this.nombre = json.nombre;
    this.privado = json.privado;
    this.archivado = json.archivado;
    this.favorito = json.favorito;
    if (json.usuario === undefined || json.usuario === null) {
      this.usuario = null;
    } else if (typeof json.usuario === "string") {
      this.usuario = json.usuario;
    } else {
      this.usuario = new Usuario(json.usuario);
    }
    this.palabras = Palabra.mapArray(json.palabras);
    this.idioma1 = json.idioma1;
    this.idioma2 = json.idioma2;
    this.fechaCreacion = new Date(json.fechaCreacion);
  }

  _id: string;
  nombre: string;
  descripcion: string;
  privado: boolean;
  archivado: boolean;
  favorito: boolean;
  usuario: any;
  palabras: Array<Palabra>;
  idioma1: string;
  idioma2: string;
  fechaCreacion: Date;

  printFechaCreacion(): string {
    return this.fechaCreacion.toDateString();
  }

  getUsuarioId() {
    if (this.usuario === undefined || this.usuario === null) return null;
    return typeof this.usuario === "object" ? this.usuario._id : this.usuario;
  }

  static map(json) {
    return new Mazo(json);
  }
  static mapArray(array: Array<any>) {
    let result = new Array(array.length);
    for (let i in array) {
      result[i] = new Mazo(array[i]);
    }
    return result;
  }
}
