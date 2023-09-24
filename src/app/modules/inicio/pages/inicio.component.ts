import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Title } from "@angular/platform-browser";
import { fadeInOutAnimation } from "src/app/shared/animations/animations";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"],
  animations: [fadeInOutAnimation],
})
export class InicioComponent {
  constructor(private titleService: Title) {
    titleService.setTitle(
      "Bienvenido a tu aplicación de idiomas - VocabMaster",
    );
  }
}
