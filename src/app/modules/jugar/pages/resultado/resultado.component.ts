import { Component, OnInit } from "@angular/core";
import { IntentoService } from "../../services/intento.service";
import { Palabra } from "src/app/core/models/Palabra";
import { PalabraIntento } from "src/app/core/models/PalabraIntento";
import { ActivatedRoute, Router } from "@angular/router";
import { FechaService } from "src/app/shared/services/fechaService/fecha.service";
import { Intento } from "src/app/core/models/Intento";
import { MazoService } from "src/app/shared/services/mazoService/mazo.service";
import { Mazo } from "src/app/core/models/Mazo";
import { Title } from "@angular/platform-browser";
import { fadeInOutAnimation } from "src/app/shared/animations/animations";

@Component({
  selector: "app-resultado",
  templateUrl: "./resultado.component.html",
  styleUrls: ["./resultado.component.css"],
  animations: [fadeInOutAnimation],
})
export class ResultadoComponent implements OnInit {
  intento: Array<PalabraIntento> = [];
  arrayPalabrasAcertadas: Array<PalabraIntento> = [];
  arrayPalabrasFalladas: Array<PalabraIntento> = [];
  palabrasTotales: number = null;
  palabrasAcertadas: number = null;
  palabrasFalladas: number = null;
  mazoId: string = null;
  mazo: Mazo;
  fechaResponse: string;
  showNatal: boolean = false;

  intentoAnterior: Intento;
  intentoGuardado: Intento;

  constructor(
    public intentoService: IntentoService,
    private route: ActivatedRoute,
    private router: Router,
    private fechaService: FechaService,
    private mazoService: MazoService,
    private titleService: Title,
  ) {}

  ngOnInit(): any {
    this.titleService.setTitle("Resultado del intento - VocabMaster");

    this.route.paramMap.subscribe((param) => {
      this.mazoId = param.get("mazoId");
      this.mazoService.getMazoById(this.mazoId).then((mazo) => {
        this.mazo = new Mazo(mazo);
      });
    });

    if (this.intentoService.intento.length > 0) {
      this.intento = this.intentoService.intento;
      this.arrayPalabrasAcertadas = this.intento.filter(
        (palabra) => palabra.acertada,
      );
      this.arrayPalabrasFalladas = this.intento.filter(
        (palabra) => !palabra.acertada,
      );
      this.palabrasTotales = this.intento.length;
      this.palabrasAcertadas = this.intento.filter(
        (palabra) => palabra.acertada,
      ).length;
      this.palabrasFalladas = this.palabrasTotales - this.palabrasAcertadas;

      this.intentoService
        .getUltimoIntento(this.mazoId)
        .then((intentoAnterior) => {
          this.intentoAnterior = new Intento(intentoAnterior);
          return this.intentoService.guardarIntento(this.mazoId, this.intento);
        })
        .catch((error) => {
          if (error.status === 404) {
            this.intentoAnterior = null;
            return this.intentoService.guardarIntento(
              this.mazoId,
              this.intento,
            );
          } else console.log(error);
        })
        .then((intentoGuardado) => {
          this.fechaResponse = this.fechaService.parseFecha(
            intentoGuardado["fecha"],
          );
          this.intentoGuardado = new Intento(intentoGuardado);
          if (this.intentoAnterior) {
            this.compararIntentos();
          }
        });
    }
    this.intentoService.intento = [];
  }

  comparacion: any;

  compararIntentos() {
    let comparacion = {
      acertadasSiempre: [],
      falladasSiempre: [],
      acertadasTrasFallo: [],
      falladasTrasAcierto: [],
      nuevas: [],
    };
    for (let palabra of this.intentoGuardado.palabras) {
      let palabraIntentoAnterior = this.intentoAnterior.palabras.filter(
        (p) => p.natal === palabra.natal && p.traduccion === palabra.traduccion,
      );

      if (palabraIntentoAnterior.length > 0) {
        // La palabra existía en el último intento. Ver progreso
        let p = palabraIntentoAnterior[0];
        if (p.acertada) {
          // Si la palabra se acertó la ultima vez
          if (palabra.acertada) comparacion.acertadasSiempre.push(palabra);
          else comparacion.falladasTrasAcierto.push(palabra);
        } else {
          // Si la palabra no se acertó la ultima vez
          if (palabra.acertada) comparacion.acertadasTrasFallo.push(palabra);
          else comparacion.falladasSiempre.push(palabra);
        }
      } else {
        //Si no se encuentra, se añade con respecto al último intento
        comparacion.nuevas.push(palabra);
      }
    }
    this.comparacion = comparacion;
  }

  volverAMazo() {
    this.router.navigate(["mazo", this.mazoId]);
  }

  toogleIdioma() {
    this.showNatal = !this.showNatal;
  }
}
