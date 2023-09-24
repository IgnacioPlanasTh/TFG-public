export class Palabra {
  constructor(json) {
    this._id = json._id;
    this.natal = json.natal;
    this.traduccion = json.traduccion;
  }
  _id: string;
  natal: string;
  traduccion: string;

  static mapArray(array): Array<Palabra> {
    for (let i in array) {
      array[i] = new Palabra(array[i]);
    }
    return array;
  }
}
