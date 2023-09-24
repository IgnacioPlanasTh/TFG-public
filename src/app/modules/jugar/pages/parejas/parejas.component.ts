import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Mazo } from "src/app/core/models/Mazo";
import { Palabra } from "src/app/core/models/Palabra";
import { PalabraIntento } from "src/app/core/models/PalabraIntento";
import { MazoService } from "src/app/shared/services/mazoService/mazo.service";
import { IntentoService } from "../../services/intento.service";
import * as lodash from "lodash";
import { Title } from "@angular/platform-browser";
import { fadeInOutAnimation } from "src/app/shared/animations/animations";
@Component({
  selector: "app-parejas",
  templateUrl: "./parejas.component.html",
  styleUrls: ["./parejas.component.css"],
  animations: [fadeInOutAnimation],
})
export class ParejasComponent implements OnInit {
  constructor(
    private mazoService: MazoService,
    private route: ActivatedRoute,
    private router: Router,
    private intentoService: IntentoService,
    private titleService: Title,
  ) {}

  mazoId: string = null;
  mazo: Mazo = null;
  practica: boolean = null;
  error: boolean = false;
  errorMsg: string = "";
  intento: Array<PalabraIntento> = [];
  finalizado: boolean = false;

  palabrasMostradas: Array<Palabra> = [];
  palabrasNatalMostradas: Array<Palabra> = [];
  palabrasTraduccionMostradas: Array<Palabra> = [];

  natalSeleccionado: HTMLDivElement = null;
  traduccionSeleccionado: HTMLDivElement = null;

  ngOnInit(): void {
    this.titleService.setTitle("Modo de juego parejas - VocabMaster");

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
    this.palabrasMostradas = this.mazo.palabras;
    this.palabrasNatalMostradas = lodash.shuffle(this.palabrasMostradas);
    this.palabrasTraduccionMostradas = lodash.shuffle(this.palabrasMostradas);
  }

  clickNatal(event: any) {
    let divElement = event.target as HTMLDivElement;
    if (this.practica) {
      // Si es practica se puede volver a intentar acertar una palabra fallada
      divElement.classList.remove("fallado");
    }
    if (
      divElement.classList.contains("acertado") ||
      divElement.classList.contains("fallado")
    ) {
      return; // Si se ha acertado o fallado no se hace nada. En caso de no ser intento se elimina la clase 'fallado' antes
    }

    if (divElement.classList.contains("seleccionado")) {
      //Quitar seleccionado si se vuelve a clicar
      divElement.classList.remove("seleccionado");
      this.natalSeleccionado = null;
    } else {
      divElement.classList.add("seleccionado");
      if (this.natalSeleccionado) {
        this.natalSeleccionado.classList.remove("seleccionado"); //se elimina el otro elemento seleccionado si lo hay
      }
      this.natalSeleccionado = divElement;
      if (this.traduccionSeleccionado) this.comprobarSeleccionados();
    }
  }

  clickTraduccion(event: any) {
    let divElement = event.target as HTMLDivElement;
    if (this.practica) {
      // Si es practica se puede volver a intentar acertar una palabra fallada
      divElement.classList.remove("fallado");
    }
    if (
      divElement.classList.contains("acertado") ||
      divElement.classList.contains("fallado")
    ) {
      return; // Si se ha acertado o fallado no se hace nada. En caso de no ser intento se elimina la clase 'fallado' antes
    }

    if (divElement.classList.contains("seleccionado")) {
      //Quitar seleccionado si se vuelve a clicar
      divElement.classList.remove("seleccionado");
      this.traduccionSeleccionado = null;
    } else {
      divElement.classList.add("seleccionado");
      if (this.traduccionSeleccionado) {
        this.traduccionSeleccionado.classList.remove("seleccionado"); //se elimina el otro elemento seleccionado si lo hay
      }
      this.traduccionSeleccionado = divElement;
      if (this.natalSeleccionado) this.comprobarSeleccionados();
    }
  }

  comprobarSeleccionados() {
    let natalId = this.natalSeleccionado.getAttribute("palabraId");
    let traduccionId = this.traduccionSeleccionado.getAttribute("palabraId");
    this.natalSeleccionado.classList.remove("seleccionado");
    this.traduccionSeleccionado.classList.remove("seleccionado");

    if (natalId === traduccionId) {
      this.natalSeleccionado.classList.add("acertado");
      this.traduccionSeleccionado.classList.add("acertado");
      let index = this.intento.findIndex((palabra) => palabra._id == natalId);
      this.intento[index].acertada = true;
    } else {
      this.natalSeleccionado.classList.add("fallado");
      this.traduccionSeleccionado.classList.add("fallado");
      //Guardar como no aprendida ambos valores
      let indexNatal = this.intento.findIndex(
        (palabra) => palabra._id == natalId,
      );
      this.intento[indexNatal].acertada = false;
      let indexTraduccion = this.intento.findIndex(
        (palabra) => palabra._id == traduccionId,
      );
      this.intento[indexTraduccion].acertada = false;
    }

    this.natalSeleccionado = null;
    this.traduccionSeleccionado = null;
    this.checkFinal();
  }

  checkFinal() {
    let finalizado = true;
    for (let palabra of this.palabrasNatalMostradas) {
      if (this.intento.find((p) => p._id == palabra._id).acertada === null) {
        finalizado = false;
        break;
      }
    }
    if (finalizado) {
      this.finalizado = true;
    }
  }

  get numPalabrasNoMarcadasEnIntento(): number {
    let palabrasANull = this.intento.filter((entry) => entry.acertada == null);
    return palabrasANull.length;
  }

  reiniciarIntentoPractica() {
    let traduccionesContainer: HTMLElement = document.getElementById(
      "palabrasTraduccionesContainer",
    );
    let natalesContainer: HTMLElement = document.getElementById(
      "palabrasNatalesContainer",
    );

    for (let palabra of this.intento) {
      let id = palabra._id;
      let palabraTraduccion = Array.from(
        traduccionesContainer.querySelectorAll("[palabraId]"),
      ).find(
        (element: HTMLElement) => element.getAttribute("palabraId") === id,
      );
      let palabraNatal = Array.from(
        natalesContainer.querySelectorAll("[palabraId]"),
      ).find(
        (element: HTMLElement) => element.getAttribute("palabraId") === id,
      );

      palabraTraduccion.classList.remove("acertado", "fallado", "seleccionado");
      palabraNatal.classList.remove("acertado", "fallado", "seleccionado");
    }
    this.selectPractica();
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

  volverAMazo() {
    if (this.practica || confirm("Desea cancelar el intento y salir?")) {
      this.router.navigateByUrl("/mazo/" + this.mazoId);
    }
  }
}
