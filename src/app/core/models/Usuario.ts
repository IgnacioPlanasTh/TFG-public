import { Imagen } from "./Imagen";

export class Usuario {
  constructor(json) {
    this._id = json._id;
    this.nombre = json.nombre;
    this.apellido = json.apellido;
    this.idioma = json.idioma;
    this.apodo = json.apodo;
    if (json.avatar) {
      this.avatar = Imagen.map(json.avatar);
    }
    this.fechaAlta = new Date(json.fechaAlta);
  }
  _id: string;
  nombre: string;
  apellido: string;
  idioma: string;
  apodo: string;
  avatar: Imagen;
  fechaAlta: Date;

  static map(json) {
    return new Usuario(json);
  }
}
