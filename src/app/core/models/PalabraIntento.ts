export class PalabraIntento {
  constructor(json) {
    this._id = json._id;
    this.natal = json.natal;
    this.traduccion = json.traduccion;
    this.acertada = json.acertada;
  }
  _id: string;
  natal: string;
  traduccion: string;
  acertada: boolean;

  static mapArray(array): Array<PalabraIntento> {
    for (let i in array) {
      array[i] = new PalabraIntento(array[i]);
    }
    return array;
  }
}
