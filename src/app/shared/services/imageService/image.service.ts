import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ImageService {
  constructor() {}

  renderImage(image: any) {
    var src = image.data;
    var result = "data:" + image.contentType + ";base64," + src;
    // 'data:' + image.contentType + ';base64,' + btoa(String.fromCharCode.apply(null, new Uint8Array(src))) ;
    return result;
  }
}
