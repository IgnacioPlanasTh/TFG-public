export class Imagen {
  constructor(json) {
    this.data = json.data;
    this.contentType = json.contentType;
  }

  data: any;
  contentType: string;

  static map(json) {
    return new Imagen(json);
  }
}
