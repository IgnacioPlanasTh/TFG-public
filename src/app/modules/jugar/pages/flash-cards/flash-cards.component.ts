import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Mazo } from "src/app/core/models/Mazo";
import { Palabra } from "src/app/core/models/Palabra";
import { MazoService } from "src/app/shared/services/mazoService/mazo.service";
import { IntentoService } from "../../services/intento.service";
import { PalabraIntento } from "src/app/core/models/PalabraIntento";
import { Title } from "@angular/platform-browser";
import { fadeInOutAnimation } from "src/app/shared/animations/animations";

@Component({
  selector: "app-flash-cards",
  templateUrl: "./flash-cards.component.html",
  styleUrls: ["./flash-cards.component.css"],
  animations: [fadeInOutAnimation],
})
export class FlashCardsComponent implements OnInit {
  constructor(
    private mazoService: MazoService,
    private router: Router,
    private route: ActivatedRoute,
    private intentoService: IntentoService,
    private titleService: Title,
  ) {}

  mazoId: string = null;
  mazo: Mazo = null;
  practica: boolean = null;
  palabraActual: Palabra = null;
  natal: boolean = false;
  index: number = 0;
  error: boolean = false;
  errorMsg: string = "";
  intento: Array<PalabraIntento> = [];

  ngOnInit(): void {
    this.titleService.setTitle("Modo de juego flashcards - VocabMaster");
    this.route.paramMap.subscribe((param) => {
      this.mazoId = param.get("mazoId");
      this.mazoService
        .getMazoById(this.mazoId)
        .then((mazo) => {
          if (mazo.palabras.length === 0) {
            this.error = true;
            this.errorMsg = "Este mazo no tiene palabras";
          } else {
            this.mazo = new Mazo(mazo);
          }
        })
        .catch((err) => {
          this.error = true;
          this.errorMsg = "No se ha encontrado el mazo";
        });
    });
  }

  selectPractica() {
    this.practica = true;
    this.iniciarJuego();
    this.inicializarIntento();
  }

  selectIntento() {
    this.practica = false;
    this.iniciarJuego();
    this.inicializarIntento();
  }

  inicializarIntento() {
    this.intento = Array(this.mazo.palabras.length).fill({
      _id: "",
      natal: "",
      traduccion: "",
      acertada: false,
    });
    for (let index in this.mazo.palabras) {
      this.intento[index] = {
        _id: this.mazo.palabras[index]._id,
        natal: this.mazo.palabras[index].natal,
        traduccion: this.mazo.palabras[index].traduccion,
        acertada: null,
      };
    }
  }

  iniciarJuego() {
    this.palabraActual = this.mazo.palabras[0];
  }

  alternarTraduccion() {
    this.natal = !this.natal;
    document.getElementById("card").classList.toggle("is-flipped");
  }

  siguientePalabra() {
    this.index++;
    this.actualizarPalabraActual();
  }

  anteriorPalabra() {
    console.log("ANTERIORPALABRA");
    this.index--;
    this.actualizarPalabraActual();
  }

  actualizarPalabraActual() {
    this.palabraActual = this.mazo.palabras[this.index];
  }

  marcarComoAprendida() {
    this.intento[this.index].acertada = true;
    if (this.index < this.mazo.palabras.length - 1) this.siguientePalabra();
  }
  marcarComoNoAprendida() {
    this.intento[this.index].acertada = false;
    if (this.index < this.mazo.palabras.length - 1) this.siguientePalabra();
  }

  volverAMazo() {
    if (this.practica || confirm("Desea cancelar el intento y salir?")) {
      this.router.navigateByUrl("/mazo/" + this.mazoId);
    }
  }

  get numPalabrasNoMarcadasEnIntento(): number {
    let palabrasANull = this.intento.filter((entry) => entry.acertada == null);
    return palabrasANull.length;
  }

  terminarIntento() {
    let finalizar: boolean = false;
    if (this.numPalabrasNoMarcadasEnIntento > 0) {
      if (
        confirm(
          "Hay palabras que no han sido marcadas. Se marcarán como no aprendidas. Desea continuar?",
        )
      ) {
        finalizar = true;
        for (let palabra of this.intento) {
          if (palabra.acertada === null) palabra.acertada = false;
        }
      }
    } else if (confirm("Desea finalizar el intento?")) finalizar = true;

    if (finalizar) {
      this.intentoService.intento = this.intento;
      this.router.navigateByUrl("/jugar/" + this.mazoId + "/finalizar");
    }
  }
}
