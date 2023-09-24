import { PalabraIntento } from "./PalabraIntento";

export class Intento {
  constructor(json) {
    this._id = json._id;
    this.mazoId = json.mazoId;
    this.acertadas = json.acertadas;
    this.totales = json.totales;
    this.palabras = PalabraIntento.mapArray(json.palabras);
    this.fecha = new Date(json.fecha);
  }
  _id: string;
  mazoId: string;
  fecha: Date;
  totales: number;
  acertadas: number;
  palabras: Array<PalabraIntento>;

  static mapArray(array: Array<any>): Array<Intento> {
    if (array.length === 0) return [];
    let result = new Array<Intento>(array.length);
    for (let i in array) {
      result[i] = new Intento(array[i]);
    }
    return result;
  }
}
