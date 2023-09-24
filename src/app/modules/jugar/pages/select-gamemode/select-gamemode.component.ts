import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { fadeInOutAnimation } from "src/app/shared/animations/animations";

@Component({
  selector: "app-select-gamemode",
  templateUrl: "./select-gamemode.component.html",
  styleUrls: ["./select-gamemode.component.css"],
  animations: [fadeInOutAnimation],
})
export class SelectGamemodeComponent {
  constructor(private titleService: Title) {
    titleService.setTitle("Elige el modo de juego - VocabMaster");
  }
}
