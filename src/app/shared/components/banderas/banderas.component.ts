import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-banderas",
  templateUrl: "./banderas.component.html",
  styleUrls: ["./banderas.component.css"],
})
export class BanderasComponent implements OnInit {
  private _pais: string;

  @Input() set pais(value: string) {
    this._pais = value;
    this.path = this.computePathToImg(this._pais);
  }

  get pais(): string {
    return this._pais;
  }

  constructor() {}
  path: string = null;

  ngOnInit(): void {
    if (!this.pais) throw Error("El atributo pais es obligatorio");
    this.path = this.computePathToImg(this._pais);
  }

  computePathToImg(pais: string): string {
    var nombreImagen = "";
    switch (this._pais) {
      case "es":
        nombreImagen = "spain";
        break;
      case "en":
        nombreImagen = "uk";
        break;
      case "fr":
        nombreImagen = "france";
        break;
      case "it":
        nombreImagen = "italy";
        break;
      case "ja":
        nombreImagen = "japan";
        break;
      case "de":
        nombreImagen = "germany";
        break;
      case "zh":
        nombreImagen = "china";
        break;
      case "pt":
        nombreImagen = "portugal";
        break;
    }
    return "../../../assets/images/" + nombreImagen + "_flag.png";
  }
}
